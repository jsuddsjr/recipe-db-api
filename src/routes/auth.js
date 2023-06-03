const express = require('express')
const passport = require('./middlewares/passport-strategies')
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


router.get('/login', passport.authenticate('local', {
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

module.exports = router
