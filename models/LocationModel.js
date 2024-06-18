const {
    deserialize
} = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LocationSchema = new Schema({
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    directions: {
        type: Object,
        required: true,
    },
    distanceMatrix: {
        type: Object,
        required: true,
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    driverId: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },

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
module.exports = mongoose.model('Location', LocationSchema)