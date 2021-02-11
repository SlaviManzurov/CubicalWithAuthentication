const router = require('express').Router();
const authService = require('../services/authService')

const isAuthenticated = require('../middlewares/IsAuthenticated')
const isGuest = require('../middlewares/isGuest')

router.get('/login', isGuest, (req, res) => {
    res.render('login')
})


router.post('/login', isGuest, async (req,res) => {
    const {username, password} = req.body
    try {
        let token = await authService.login({username, password})
        res.cookie('USER_SESSION', token)
        res.redirect('/')
    } catch (error) {
        console.log(error);
        res.render('login', {error})
    }
})

router.get('/register',isGuest, (req, res) => {
    res.render('register')
})

router.post('/register',isGuest, async (req, res) => {
    const {username, password, repeatPassword} = req.body

    if (password !== repeatPassword) {
        res.render('register', {message: 'Password missmatch'})
        return
    }

    try {
        let user = await authService.register({username, password})
        
        console.log(user);
        res.redirect('/auth/login')
    } catch (error) {
        res.render('register', { error })
    }

})

router.get('/logout', isAuthenticated, (req, res) =>{
    res.clearCookie('USER_SESSION')
    res.redirect('/')
})

module.exports = router