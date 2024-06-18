const express = require('express')
const itemscontroller = require('../../controllers/itemsController')
const router = express.Router()

const {adminOnly} = require('../../middleware/requireAuth')

router.get('/items',adminOnly,itemscontroller.get_all_items)
router.get('/items/:_id',adminOnly,itemscontroller.get_itemsById)
router.post('/items',adminOnly,itemscontroller.create_items)
router.post('/items/update/:_id',adminOnly,itemscontroller.update_items)
router.post('/items/delete/:_id',adminOnly,itemscontroller.deleted_items)

module.exports = router