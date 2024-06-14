const {
    deserialize
} = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemsSchema = new Schema({
    displayName: {
        type: String,
        required: true,

    },
    description: {
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
module.exports = mongoose.model('items', itemsSchema)