const express = require('express')

const router = express.Router()

const requireAuth = require('../../middleware/requireAuth')
const assetCategoryController = require('../../controllers/assetCategoryController')


router.use(requireAuth)

router.get('/ac',assetCategoryController.get_all_data)

module.exports = router