const {
    deserialize
} = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    lokasiMuat: {
        type: String,
        required: true,

    },
    lokasiTujuan: {
        type: String,
        required: false,
    },
    JarakTempuh: {
        type: String,
        required: false,
    },
    Estimasi: {
        type: String,
        required: false,
    },
    userId: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],

    is_active: {
        type: Number,
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








})
module.exports = mongoose.model('orders', orderSchema)