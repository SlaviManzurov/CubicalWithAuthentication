// TODO: Require Controllers...
const productController = require('../controllers/productController')
const aboutController = require('../controllers/aboutController')
const accerssoryController = require('../controllers/accessoryController')
const authController = require('../controllers/authController')


module.exports = (app) => {
    app.use('/', productController)
    app.use('/auth', authController)
    app.use('/about', aboutController)
    app.use('/accessories', accerssoryController)
    app.get('*',(req,res)=>{
        res.render('404')
    })
};