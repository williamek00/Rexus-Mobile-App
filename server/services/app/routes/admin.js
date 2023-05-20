const Controller = require('../controllers/admin')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()
router.post('/admin/login',Controller.login)
router.post('/admin/register',authentication,Controller.register)
//main entity
router.get('/admin/keyboard',Controller.fetchKeyboard)
router.get('/admin/webcam',Controller.fetchWebcam)
router.get('/admin/headset',Controller.fetchHeadset)
router.post('/admin/newproduct',Controller.addProducts)
router.get('/admin/product/:id',Controller.fetchProductById)
router.delete('/admin/deleteproduct/:id',Controller.deleteProducts)
router.put('/admin/updateproduct/:id',Controller.updateProducts)
//2nd entity
router.get('/admin/category',Controller.fetchCategories)
router.get('/admin/category/:id',Controller.fetchCategoryById)
router.post('/admin/newcategory',Controller.addCategories)
router.delete('/admin/deletecategory/:id',Controller.deleteCategories)
router.patch('/admin/updatecategory/:id',Controller.updateNameCategories)

module.exports = router