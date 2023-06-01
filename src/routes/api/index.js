const {Router} = require('express')
const ingredientRouter = require('./ingredients.js')
const recipeRouter = require('./recipes.js')
const userRouter = require('./users.js')

const router = Router()

router.use((request, response, next) => {
	console.log('api request', new Date().toLocaleString())
	next()
})

/* Pass ALL traffic to handlers. */
router.use(
	'/ingredients',
	/* #swagger.tags = ['Ingredient'] */ ingredientRouter,
)
router.use('/recipes', /* #swagger.tags = ['Recipe'] */ recipeRouter)
router.use('/users', /* #swagger.tags = ['User'] */ userRouter)

module.exports = router
