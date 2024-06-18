const express           = require('express');
const {driverOnly} = require('../../middleware/requireAuth')
const {adminOnly} = require('../../middleware/requireAuth')
const driverController = require('../../controllers/driverController');
const router = express.Router();

router.get('/drivers',adminOnly, driverController.get_all_driver)
router.post('/drivers',adminOnly, driverController.create_driver)
router.get('/drivers/:_id',driverOnly, driverController.get_by_driverId)
router.post('/drivers/update/:_id',driverOnly, driverController.update_driver)
router.post('/drivers/cp/:_id',driverOnly, driverController.update_password)
router.post('/drivers/delete/:_id',adminOnly, driverController.delete_driverById)

module.exports = router