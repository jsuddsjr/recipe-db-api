const express = require('express')
const nutritionRouter = require('./route-api-nutrition.js')
const recipeRouter = require('./route-api-recipe.js')
const userRouter = require('./route-api-user.js')

const router = new express.Router()

/* GET home page. */
router.get('/nutrition', nutritionRouter)
router.get('/recipe', recipeRouter)
router.get('/user', userRouter)

module.exports = router
