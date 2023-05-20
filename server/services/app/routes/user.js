const Controller = require('../controllers/user')


const router = require('express').Router()

router.get('/product',Controller.fetchProduct)
router.get('/webcam',Controller.fetchWebcam)
router.get('/keyboard',Controller.fetchKeyboard)
router.get('/headset',Controller.fetchHeadset)
router.get('/product/:id',Controller.fetchProductById)

module.exports = router