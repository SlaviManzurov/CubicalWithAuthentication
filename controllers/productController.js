const { Router } = require('express')
const productService = require('../services/productServices')
const accessoryService = require('../services/accessoryService')
const isAuthenticated = require('../middlewares/IsAuthenticated')
const isGuest = require('../middlewares/isGuest')

const router = Router()


router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => {
            res.render('home', { products })
        })
})

router.get('/create', isAuthenticated, (req, res) => {
    res.render('create')
})

router.post('/create', isAuthenticated, (req, res) => {


    productService.createProduct(req.body, req.user._id)
        .then(() => res.redirect('/'))
    // let data = req.body;
    // productService.createProduct(data)
    // res.redirect('/')
})

router.get('/details/:productId', async (req, res) => {

    let product = await productService.getOneWithAccessories(req.params.productId)
    res.render('details', { product })
})

router.get('/:productId/attach', isAuthenticated, async (req, res) => {
    let product = await productService.getOne(req.params.productId)
    let accessories = await accessoryService.getAll()
    res.render('attachAccessory', { product, accessories })
})

router.post('/:productId/attach', isAuthenticated, (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() => res.redirect(`/details/${req.params.productId}`))
})

router.get('/:productId/edit', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            res.render('editCube', product)
        })
})

router.post('/:productId/edit', isAuthenticated, (req, res) => {
    productService.updateOne(req.params.productId, req.body)
        .then(response => {
            res.redirect(`/details/${req.params.productId}`)
        })
})

router.get('/:productId/delete', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            res.render('deleteCube', product)
        })
})

router.post('/:productId/delete', isAuthenticated, (req, res) => {
    productService.deleteOne(req.params.productId)
        .then(response => res.redirect('/'))
})

module.exports = router;