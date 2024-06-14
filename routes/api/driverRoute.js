const express           = require('express');
const requireAuth       = require('../../middleware/requireAuth');
const driverController = require('../../controllers/driverController');
const router = express.Router();

router.use(requireAuth)
router.get('/drivers', driverController.get_all_driver)
router.post('/drivers', driverController.create_driver)
router.get('/drivers/:_id', driverController.get_by_driverId)
router.post('/drivers/update/:_id', driverController.update_driver)
router.post('/drivers/cp/:_id', driverController.update_password)
router.post('/drivers/delete/:_id', driverController.delete_driverById)

module.exports = router