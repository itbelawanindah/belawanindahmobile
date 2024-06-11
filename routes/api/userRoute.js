const express           = require('express');
const userController    = require('../../controllers/userController');
const requireAuth       = require('../../middleware/requireAuth');
const router = express.Router();

router.use(requireAuth)
router.get('/users', userController.get_all_users)
router.get('/users/:_id', userController.get_by_userId)
router.post('/users/update/:_id', userController.update_user)
router.post('/users/cp/:_id', userController.update_password)
router.post('/users/:_id', userController.delete_userById)

module.exports = router