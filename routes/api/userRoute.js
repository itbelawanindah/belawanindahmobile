const express           = require('express');
const userController    = require('../../controllers/userController');
const {adminOnly,userOnly} = require('../../middleware/requireAuth')
const router = express.Router();

router.get('/users', adminOnly,userController.get_all_users)
router.get('/users/:_id',userOnly,userController.get_by_userId)
router.post('/users/update/:_id',userOnly,userController.update_user)
router.post('/users/cp/:_id',userOnly,userController.update_password)
router.post('/users/:_id',adminOnly,userController.delete_userById)

module.exports = router