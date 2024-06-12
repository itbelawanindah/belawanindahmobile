const express = require('express')

const router = express.Router()

const requireAuth = require('../../middleware/requireAuth')
const assetCategoryController = require('../../controllers/assetCategoryController')


router.use(requireAuth)

router.get('/ac',assetCategoryController.get_all_data)
router.post('/ac',assetCategoryController.create_ac)
router.get('/ac/:_id',assetCategoryController.get_AcById)
router.post('/ac/update/:_id',assetCategoryController.update_ac)
router.post('/ac/delete/:_id',assetCategoryController.deleted_ac)

module.exports = router