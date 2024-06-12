const validator = require('validator')
const {
    findOne
} = require('../models/UserModel')
const ac = require('../models/AcModel')
const UserModel = require('../models/UserModel')
const moment = require('moment')
moment.locale('id');



module.exports = {
    get_all_data: async (req, res) => {
       try {
        const is_active=1
        let getAll = await ac.find({is_active}).populate('userId')
        res.json(getAll)
       } catch (error) {
        res.status(401).json(error)
       }
    },
    create_ac: async (req, res) => {
        const { displayName, description } = req.body;

        try {
            if (!displayName) {
                throw new Error('Please enter category name');
            }
    
            // Assuming req.user is populated by the requireAuth middleware
            const acs = new ac({
                displayName,
                description,
                is_active: 1,
                userId: req.user._id,
                created_at: moment().format('YYYY-MM-DD HH:mm:ss')
            });
    
            const saveAc = await acs.save();
    
            res.status(200).json({
                success: true,
                data: saveAc
            });
    
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            });
        }
    },
    get_AcById:
    async(req,res)=>{
        try {
            const acs = await ac.findById(req.params._id).populate('userId');
            if (!acs) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json(acs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    update_ac:
    async(req,res)=>{
            const { displayName, description } = req.body;

        try {
            if (!displayName) {
                throw new Error('Please enter category name');
            }
            const Updateac = await ac.findByIdAndUpdate(req.params._id,{
                displayName,
                description,
                userId: req.user._id,
                updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
            })
    
            res.status(200).json({
                success: true,
                data: Updateac
            });
    
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            });
        }
    },
    deleted_ac:
    async(req,res)=>{

        try {
           
            const deleteAc = await ac.findByIdAndUpdate(req.params._id,{
                is_active:0,
                userId: req.user._id,
                deleted_at: moment().format('YYYY-MM-DD HH:mm:ss')
            })
    
            res.status(200).json({
                success: true,
                data: deleteAc,
                message:"Asset Category berhasil Update"
            });
    
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }
    
}