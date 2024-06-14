const validator = require('validator')

const item = require('../models/itemsModel')
const moment = require('moment')
moment.locale('id')


module.exports = {
    get_all_items: async (req, res) => {
        try {
            const is_active = 1
            const getItems = await item.find({
                is_active
            }).populate('userId')
            res.json(getItems)
        } catch (error) {
            res.json(error)
        }
    },
    create_items: async (req, res) => {
        const {
            displayName,
            description
        } = req.body

        try {
            if (!displayName) {
                throw new Error('Please enter Items Category')
            }
            const Exist = await item.findOne({
                displayName
            })
            if (Exist) {
                throw Error('Items already exists')
            }
            const items = new item({
                displayName,
                description,
                is_active: 1,
                userId: req.user._id,
                created_at: moment().format('YYYY-MM-DD HH:mm:ss')
            })

            const saveItems = await items.save()

            res.status(200).json({
                success: true,
                data: saveItems
            })
        } catch (error) {
            res.status(400).json({
                success: true,
                message: error.message
            })
        }

    },
    get_itemsById: async (req, res) => {
        try {
            const items = await item.findById(req.params._id).populate('userId')
            if (!items) {
                return res.status(404).json({
                    message: "Items category Not Found"
                })
            }
            res.status(200).json(items)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: error.message
            })
        }
    },
    update_items: async (req, res) => {
        const {
            displayName,
            description
        } = req.body

        try {
            if (!displayName) {
                throw new Error('Please enter Items Category')
            }
            const Exist = await item.findOne({
                displayName
            })
            if (Exist) {
                throw Error('Items already exists')
            }
            const updateItems = await item.findByIdAndUpdate(req.params._id,{
                displayName,
                description,
                userId: req.user._id,
                updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
            })


            res.status(200).json({
                success: true,
                data: updateItems
            })
        } catch (error) {
            res.status(400).json({
                success: true,
                message: error.message
            })
        }
    },
    deleted_items:
    async(req,res)=>{
        
    try {
        const deleteItems = await item.findByIdAndUpdate(req.params._id,{
            is_active:0,
            userId:req.user._id,
            deleted_at:moment().format('YYYY-MM-DD HH:mm:ss')
        })
        res.status(200).json({
            success:true,
            data:deleteItems,
            message:"Items Success Deleted"
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
    }

}