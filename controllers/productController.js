const { Router } = require('express')
const productService = require('../services/productServices')
const accessoryService = require('../services/accessoryService')

const router = Router()


router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => {
            res.render('home', { products })
        })
})

router.get('/create', (req, res) => {
    res.render('create')
})

router.post('/create', (req, res) => {

    let data = req.body;
    productService.createProduct(data)
    res.redirect('/')
})

router.get('/details/:productId', async (req, res) => {

    let product = await productService.getOneWithAccessories(req.params.productId)
    res.render('details', { product })
})

router.get('/:productId/attach', async (req, res) => {
    let product = await productService.getOne(req.params.productId)
    let accessories = await accessoryService.getAll()
    res.render('attachAccessory', { product, accessories })
})

router.post('/:productId/attach', (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() => res.redirect(`/details/${req.params.productId}`))
})

module.exports = router;