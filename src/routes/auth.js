const express = require('express')
const { body, validationResult } = require('express-validator')
const passport = require('passport')
const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/',
  successRedirect:'/api-docs'
}))

router.get('/github', passport.authenticate('github', { scope: ['profile', 'email'] }))

router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/',
  successRedirect:'/api-docs'
}))

router.get('/linkedin', passport.authenticate('linkedin', { scope: ['profile', 'email'] }))

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  failureRedirect: '/',
  successRedirect:'/api-docs'
}))

router.get('/login',
  body('email')
    .isEmail().withMessage('Email must be a valid email address.')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password cannot be empty.')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
    .isStrongPassword().withMessage('Password must contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol.'),
  (request, response, next) => {
    const errors = validationResult(request)
    if (errors.isEmpty()) {
      next()
    }
    else {
      response.status(400).json({ errors: errors.array() })
    }
  },
  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/api-docs'
  }))

router.get('/logout', (request, response) =>
  request.logout(false, (error) => {
    if (error) {
      if (error instanceof Error) throw error
      throw new Error(error)
    }
    response.redirect('/')
  }))

router.get('/me', (request, response) => {
  if (request.user) {
    response.json(request.user)
  } else {
    response.status(401).json({ message: 'Not logged in.' })
  }
})

module.exports = router
