const router = require('express').Router()
const Controller = require('../controllers/userController')

router.get('/users',Controller.getAllUsers)
router.get('/users/:id',Controller.getUserById)
router.post('/users',Controller.createUser)
router.delete('/users/:id',Controller.deleteUser)
  

module.exports = router