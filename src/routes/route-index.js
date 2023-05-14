const express = require('express')
const userRouter = require('./route-user.js')

const router = new express.Router()

/* GET home page. */
router.get('/', function (request, response) {
	response.render('view-index', {title: 'Recipe DB', active: {home: true}})
})

router.get('/nutrition', function (request, response) {
	response.render('view-nutrition', {
		title: 'Nutrition',
		active: {nutrition: true},
	})
})

router.get('/user', userRouter)

module.exports = router
