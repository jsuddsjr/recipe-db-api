const express = require('express')

const router = new express.Router()

/* GET home page. */
router.get('/', function (request, response) {
	response.render('_layout', {title: 'Express'})
})

module.exports = router
