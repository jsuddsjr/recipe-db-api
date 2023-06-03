const { body, validationResult } = require("express-validator")
const config = require("../config/config")

/**
 * Options for passport.authenticate middleware.
 * @param {import('express').Request} request - Express request object.
 * @param defaultRedirect
 * @returns {import('passport').AuthenticateOptions} - Passport authenticate options.
 * @see {@link http://www.passportjs.org/docs/authenticate/}
 */
const redirectOptions = (request, defaultRedirect = "/api-docs") => ({
  successRedirect: new URL(request.query.redirect || defaultRedirect, config.HOST_URL).toString(),
  failureMessage: true,
})

const usernamePasswordValidation = [
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address.")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .isStrongPassword()
    .withMessage(
      "Password must contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol."
    ),
  (request, response, next) => {
    const errors = validationResult(request)
    if (errors.isEmpty()) {
      request.session.contentType = request.get("Content-Type")
      return next()
    }

    if (request.get("Content-Type") === "application/x-www-form-urlencoded") {
      request.session.messages = errors.array()
      response.redirect("/profile")
    } else {
      response.status(400).json({ errors: errors.array() })
    }
  }
]

module.exports = {
  redirectOptions,
  usernamePasswordValidation,
}
