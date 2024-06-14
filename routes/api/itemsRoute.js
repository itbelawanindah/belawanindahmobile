const express = require('express')
const itemscontroller = require('../../controllers/itemsController')
const router = express.Router()


router.get('/items',itemscontroller.get_all_items)
router.get('/items/:_id',itemscontroller.get_itemsById)
router.post('/items',itemscontroller.create_items)
router.post('/items/update/:_id',itemscontroller.update_items)
router.post('/items/delete/:_id',itemscontroller.deleted_items)

module.exports = router