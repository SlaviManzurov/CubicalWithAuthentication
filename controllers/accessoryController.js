const { Router } = require('express')
const accessoryService = require('../services/accessoryService')
const router = Router()
const isAuthenticated = require('../middlewares/IsAuthenticated')
const isGuest = require('../middlewares/isGuest')


router.get('/create', isAuthenticated, (req, res) => {
    res.render('createAccessory')
})

router.post('/create', isAuthenticated, (req, res) => {
    accessoryService.createAccessory(req.body)
        .then(() => res.redirect('/'))

})
module.exports = router 