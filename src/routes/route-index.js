const {Router} = require('express')
const userRouter = require('./route-user.js')

// eslint-disable-next-line new-cap
const router = Router()

/* GET home page. */
router.get('/', function (request, response) {
	response.render('view-index', {title: 'Recipe DB', active: {home: true}})
})

/* GET nutrition page. */
router.get('/nutrition', function (request, response) {
	response.render('view-nutrition', {
		title: 'Nutrition',
		active: {nutrition: true},
	})
})

/* GET user page. */
router.use('/profile', userRouter)

module.exports = router
