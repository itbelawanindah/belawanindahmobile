const bcrypt = require('bcrypt')
const moment = require('moment')
moment.locale('id');

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const driverSchema = new Schema({
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
    required: false,
  },
  profile: {
    type: String,
    required: false,
  },
  noPolisi: {
    type: String,
    required: false,
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

  updated_password: {
    type: Date,
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});


module.exports = mongoose.model('Driver', driverSchema);