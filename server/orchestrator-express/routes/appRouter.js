const router = require('express').Router()
const Controller = require('../controllers/appController')

router.get('/keyboard',Controller.getAllKeyboard)
router.get('/webcam',Controller.getAllWebcam)
router.get('/headset',Controller.getAllHeadset)
router.post('/product',Controller.createNewProduct)
router.delete('/product/:id',Controller.deleteProducts)
router.put('/product/:id',Controller.updateProduct)
  

module.exports = router