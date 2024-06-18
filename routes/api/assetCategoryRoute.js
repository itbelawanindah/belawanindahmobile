const express = require('express')

const router = express.Router()

const {adminOnly} = require('../../middleware/requireAuth')
const assetCategoryController = require('../../controllers/assetCategoryController')



router.get('/ac',adminOnly,assetCategoryController.get_all_data)
router.post('/ac',adminOnly,assetCategoryController.create_ac)
router.get('/ac/:_id',adminOnly,assetCategoryController.get_AcById)
router.post('/ac/update/:_id',adminOnly,assetCategoryController.update_ac)
router.post('/ac/delete/:_id',adminOnly,assetCategoryController.deleted_ac)

module.exports = router