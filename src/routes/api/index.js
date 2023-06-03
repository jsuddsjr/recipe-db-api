const router = require("express").Router()
const ingredientRouter = require("./ingredients")
const recipeRouter = require("./recipes")
const userRouter = require("./users")

router.use("/ingredients", /* #swagger.tags = ['Ingredient'] */ ingredientRouter)
router.use("/recipes", /* #swagger.tags = ['Recipe'] */ recipeRouter)
router.use("/users", /* #swagger.tags = ['User'] */ userRouter)

module.exports = router
