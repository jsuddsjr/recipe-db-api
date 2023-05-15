const {Router} = require('express')
const ingredientRouter = require('./route-api-ingredients.js')
const recipeRouter = require('./route-api-recipes.js')
const userRouter = require('./route-api-users.js')

// eslint-disable-next-line new-cap
const router = Router()

router.use((request, response, next) => {
	console.log('api request', new Date().toLocaleString())
	next()
})

/* Pass ALL traffic to handlers. */
router.use('/ingredients', ingredientRouter)
router.use('/recipes', recipeRouter)
router.use('/users', userRouter)

module.exports = router
