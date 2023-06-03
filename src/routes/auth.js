const express = require("express")
const passport = require("passport")
const router = express.Router()
const controller = require("../controllers/auth")


router.get("/google", passport.authenticate("google", {}))

router.get("/google/callback", passport.authenticate("google", {
  successRedirect: "/api-docs",
  failureRedirect: "/profile",
  failureMessage: true,
}))

router.get("/github",  passport.authenticate("github", {}))

router.get("/github/callback", passport.authenticate("github", {
  successRedirect: "/api-docs",
  failureRedirect: "/profile",
  failureMessage: true,
}))

// router.get("/linkedin", passport.authenticate("linkedin"))

// router.get("/linkedin/callback",
//   passport.authenticate("linkedin", controller.authOptions))

router.post("/login",
  controller.usernamePasswordValidation,
  passport.authenticate("local", {
    successRedirect: "/api-docs",
    failureRedirect: "/profile",
    failureMessage: true,
  }))

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
