const router = require('express').Router()
const UsersController = require('../controllers/user')

router.get('/',UsersController.findAll)
router.get('/:userId',UsersController.findById)
router.delete('/:userId',UsersController.deleteUser)
router.post('/',UsersController.createUser)

module.exports = router