const express = require("express")
const passport = require("passport")
const router = express.Router()
const controller = require("../controllers/auth")


router.get("/google", (request, response, next) =>
  passport.authenticate("google", controller.redirectOptions(request))(request, response, next))

router.get("/google/callback", passport.authenticate("google", {}))

router.get("/github", (request, response, next) =>
  passport.authenticate("github", controller.redirectOptions(request))(request, response, next))

router.get("/github/callback", passport.authenticate("github", {}))

// router.get("/linkedin", passport.authenticate("linkedin"))

// router.get("/linkedin/callback",
//   passport.authenticate("linkedin", controller.authOptions))

router.post("/login",
  controller.usernamePasswordValidation,
  (request, response, next) =>
    passport.authenticate("local", controller.redirectOptions(request))(request, response, next))

router.get("/logout", (request, response) =>
  request.logout(false, (error) => {
    if (error) {
      if (error instanceof Error) throw error
      throw new Error(error)
    }
    response.redirect("/profile")
  }))

router.get("/me", (request, response) => {
  if (request.user) {
    response.json(request.user)
  } else {
    response.status(401).json({ message: "Not logged in." })
  }
})

module.exports = router
