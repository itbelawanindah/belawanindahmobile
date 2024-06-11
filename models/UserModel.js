
const bcrypt = require('bcrypt')
const moment = require('moment')
moment.locale('id');

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },

  mobile: {
    type: String,
    required: false,
  },
  card: {
    type: String,
    required: false,
  },
  kk: {
    type: String,
    required: false,
  },
  ktp: {
    type: String,
    required: false,
  },
  npwp: {
    type: String,
    required: false,
  },

  lisensi: {
    type: String,
    required: false,
  },
  roles: {
    type: String,
    required: false,
  },

  is_active: {
    type: Number,
    required: false,
  },

  aggreement: {
    type: String,
    required: false,
  },

  created_at: {
    type: Date,
    required: false,
  },

  updated_at: {
    type: Date,
    required: false,
  },

  deleted_at: {
    type: Date,
    required: false,
  },
  last_login: {
    type: Date,
    required: false,
  },
});

//static singup method
// userSchema.statics.signup = async (email,password,username,name,roles,is_active,created_at) =>{

//   const Exist = await this.findOne({email})

//   if(Exist){
//     throw Error('Email already exists')
//   }

//   const salt = await bcrypt.genSalt(10)
//   const hash = await bcrypt.hash(password,salt)

//   const user = await this.create({
//     email,
//     password  :hash,
//     username,
//     name,
//     roles     :'admins-Author',
//     is_active :1,
//     created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
  
//   })

//   return user
// }

module.exports = mongoose.model('User',userSchema);