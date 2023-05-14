const {Router} = require('express')
const nutritionRouter = require('./route-api-nutrition.js')
const recipeRouter = require('./route-api-recipe.js')
const userRouter = require('./route-api-user.js')

// eslint-disable-next-line new-cap
const router = Router()

router.use((request, response, next) => {
	console.log('api request', Date.now().toLocaleString())
	next()
})

/* Pass ALL traffic to handlers. */
router.use('/nutrition', nutritionRouter)
router.use('/recipes', recipeRouter)
router.use('/users', userRouter)

module.exports = router
