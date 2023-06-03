const router = require("express").Router()

/* GET home page. */
router.get("/", function (request, response) {
	response.render("index", {
		title: "Recipe DB",
		active: { home: true },
		user: request.user
	})
})

/* GET nutrition page. */
router.get("/ingredients", function (request, response) {
	response.render("ingredient", {
		title: "Ingredients",
		active: { ingredient: true },
		user: request.user,
	})
})

/* GET user page. */
router.use("/profile", require("./user"))

module.exports = router
