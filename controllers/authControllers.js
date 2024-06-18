const User      = require('../models/UserModel');
const Driver    = require('../models/DriverModel');
const validator = require('validator');
const bcrypt    = require("bcrypt");
const moment    = require('moment');
moment.locale('id');


const jwt = require('jsonwebtoken');
const createToken = (_id) =>{
    return jwt.sign({_id},
        process.env.SECRET_TOKEN,
        {expiresIn:'3d'}
    )
}
module.exports = {
    singup: async (req, res) => {



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

            const Exist = await User.findOne({
                email
            })
            if (Exist) {
                throw Error('Email already exists')
            }

            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)

            const user = await User.create({
                email,
                password: hash,
                username,
                name,
                roles: 'customer-Author',
                is_active: 1,
                created_at: moment().format('YYYY-MM-DD HH:mm:ss'),

            })
            const token  = createToken(user._id)
            res.status(200).json({
                email,
                token,
            })
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    },
    loginup: async (req, res) => {
        

        const {
            email,
            password,
            is_active
            // last_login:moment().format('YYYY-MM-DD HH:mm:ss'),
        } = req.body

        try {
            if(!email || !password ) {
                throw Error('All fields must be filled')
            }
            if(!validator.isEmail(email)){
                throw Error('Email is not valid')
            }
           

            const user = await User.findOne({
                email,
                is_active:1
            })
            if (!user) {
                throw Error('incorrect email')
            }

            const match = await bcrypt.compare(password, user.password)
            if(!match) {
                throw Error('incorrect password')
            }

            //create token
            const token = createToken(user._id)

            res.status(200).json({email,token})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
        // res.json({msg:"login user"})
    },
    login_driver:async(req,res)=>{
        const {
            email,
            password,
            is_active
            // last_login:moment().format('YYYY-MM-DD HH:mm:ss'),
        } = req.body

        try {
            if(!email || !password ) {
                throw Error('All fields must be filled')
            }
            if(!validator.isEmail(email)){
                throw Error('Email is not valid')
            }
           

            const driver = await Driver.findOne({
                email,
                is_active:1
            })
            if (!driver) {
                throw Error('incorrect email')
            }

            const match = await bcrypt.compare(password, driver.password)
            if(!match) {
                throw Error('incorrect password')
            }

            //create token
            const token = createToken(driver._id)

            res.status(200).json({email,token})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
        // res.json({msg:"login user"})
    },
}