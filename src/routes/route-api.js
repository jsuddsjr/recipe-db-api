const express = require('express')
const nutritionRouter = require('./route-api-nutrition.js')
const recipeRouter = require('./route-api-recipe.js')

const router = new express.Router()

/* GET home page. */
router.get('/nutrition', nutritionRouter)
router.get('/recipe', recipeRouter)

module.exports = router
