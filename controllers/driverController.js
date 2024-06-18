const {
    response
} = require("express")
const Driver = require("../models/DriverModel")
const moment = require("moment")
moment.locale('id');
const bcrypt = require("bcrypt")
const validator = require('validator');

const jwt = require('jsonwebtoken');

const createToken = (_id) =>{
    return jwt.sign({_id},
        process.env.SECRET_TOKEN,
        {expiresIn:'3d'}
    )
}

module.exports = {
    
    get_all_driver: async (req, res) => {
        try {
            const is_active = 1
            Driver.find({
                is_active
            }).populate('userId').then((result) => {

                res.json(result)
            })
        } catch (error) {
            console.log(error)
        }
    },



    get_by_driverId: async (req, res) => {

        try {
            Driver.findById(req.params._id).populate('userId').then((drivers) => {
                res.status(200).json(drivers)
            })
        } catch (error) {
            console.error(error)
            res.status(401).json({
                message: 'Driver not found'
            })
        }
    },
    create_driver: async (req, res) => {
        const {
            email,
            password,
            username,
            name,
            roles,
            is_active,
            created_at
        } = req.body

        try {
            if(!email || !password || !name || !username) {
                throw Error('All fields must be filled')
            }
            if(!validator.isEmail(email)){
                throw Error('Email is not valid')
            }
            if(!validator.isStrongPassword(password)){
                throw Error('Password is not strong enough')
            }

            const Exist = await Driver.findOne({
                email
            })
            if (Exist) {
                throw Error('Email already exists')
            }

            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)

            const drivers = await Driver.create({
                email,
                password: hash,
                username,
                name,
                roles: 'drivers-Author',
                is_active: 1,
                created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                userId:req.user._id,

            })
            const token  = createToken(drivers._id)
            res.status(200).json({
                email,
                data: drivers,
                token: token
            })
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    },



    update_driver: async (req, res) => {

        const {
            email
        } = req.body
        if (!validator.isEmail(email)) {
            throw Error('Email is not valid')
        }

        Driver.findByIdAndUpdate(req.params._id, {
                name: req.body.name,
                username: req.body.username,
                email,
                noPolisi: req.body.noPolisi,
                description: req.body.description,
                address: req.body.address,
                mobile: req.body.mobile,
                card: req.body.card,
                kk: req.body.kk,
                ktp: req.body.ktp,
                npwp: req.body.npmw,
                lisensi: req.body.lisensi,
                updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                userId:req.user._id,

            })
            .then((result) => {
                console.log(result)
                res.status(200).json({
                    message: 'Driver updated'
                })
            })
            .catch((error) => {
                console.log(error)
                res.status(400).json({
                    error: error.message
                })
            })



    },


    update_password: async (req, res) => {

        try {
            const {
                password
            } = req.body
            if (!validator.isStrongPassword(password)) {
                throw Error('Password is not strong enough')
            }
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)

            Driver.findByIdAndUpdate(req.params._id, {
                    password: hash,
                    updated_password: moment().format('YYYY-MM-DD HH:mm:ss'),

                })
                .then((result) => {
                    res.status(200).json({
                        message: 'Driver updated'
                    })
                })
                .catch((error) => {
                    res.status(500).json({
                        message: "Something went wrong"
                    })
                })
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    },



    delete_driverById: async (req, res) => {
        Driver.findByIdAndUpdate(req.params._id, {
            is_active: 0,
            deleted_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            userId:req.user._id,
        }).then((users) => {
            res.status(200).json({
                message: 'Driver deleted Successs'
            })
        }).catch((error) => {
            res.status(500).json({
                message: 'Something went wrong'
            })
        });


    }
}