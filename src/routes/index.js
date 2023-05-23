const {Router} = require('express')
const swaggerSchema = require('../models/swagger-gen.js')
const userRouter = require('./route-user.js')

// eslint-disable-next-line new-cap
const router = Router()

/* GET home page. */
router.get('/', function (request, response) {
	response.render('view-index', {title: 'Recipe DB', active: {home: true}})
})

/* GET nutrition page. */
router.get('/ingredients', function (request, response) {
	response.render('view-ingredient', {
		title: 'Ingredients',
		active: {ingredient: true},
	})
})

/* GET user page. */
router.use('/profile', userRouter)

router.use('/schema', function (request, response) {
	response.send(swaggerSchema)
})

module.exports = router
