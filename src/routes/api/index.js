const {Router} = require('express')
const ingredientRouter = require('./ingredients.js')
const recipeRouter = require('./recipes.js')
const userRouter = require('./users.js')

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
