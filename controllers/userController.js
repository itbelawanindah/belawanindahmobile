const {
    response
} = require("express")
const User = require("../models/UserModel")
const moment = require("moment")
moment.locale('id');
const bcrypt = require("bcrypt")
const validator = require('validator');

module.exports = {
    get_all_users: async (req, res) => {
        try {
            const is_active=1
            User.find({is_active}).then((result) => {

                res.json(result)
            })
        } catch (error) {
            console.log(error)
        }
    },



    get_by_userId: async (req, res) => {

        try {
            User.findById(req.params._id).then((users) => {
                res.status(200).json(users)
            })
        } catch (error) {
            console.error(error)
            res.status(401).json({
                message: 'User not found'
            })
        }
    },



    update_user: async (req, res) => {
      
            const {email} = req.body
            if(!validator.isEmail(email)){
                throw Error('Email is not valid')
            }
            
        User.findByIdAndUpdate(req.params._id, {
                name        : req.body.name,
                username    : req.body.username,
                email       ,
                description : req.body.description,
                address     : req.body.address,
                mobile      : req.body.mobile,
                card        : req.body.card,
                kk          : req.body.kk,
                ktp         : req.body.ktp,
                npwp        : req.body.npmw,
                lisensi     : req.body.lisensi,
                updated_at  : moment().format('YYYY-MM-DD HH:mm:ss'),

            })
            .then((result) => {
                res.status(200).json({
                    message: 'User updated'
                })
            })
            .catch((error) => {
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

            User.findByIdAndUpdate(req.params._id, {
                    password: hash,
                    updated_password: moment().format('YYYY-MM-DD HH:mm:ss'),

                })
                .then((result) => {
                    res.status(200).json({
                        message: 'User updated'
                    })
                })
                .catch((error) => {
                    res.status(500).json({
                        message: "something went wrong"
                    })
                })
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    },



    delete_userById: async (req, res) => {
        User.findByIdAndUpdate(req.params._id, {
            is_active: 0,
            deleted_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        }).then((users) => {
            res.status(200).json({
                message: 'User deleted Successs'
            })
        }).catch((error) => {
            res.status(500).json({
                message: 'Something went wrong'
            })
        });


    }
}