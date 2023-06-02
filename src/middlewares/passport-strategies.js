const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
const GitHubStrategy = require('passport-github2').Strategy
const config = require('../config/config')

const passport = require('passport')
const {User} = require('../models')

passport.use(new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
/**
 * @param {string} accessToken The access token
 * @param {string} [refreshToken] The refresh token
 * @param {import('passport-google-oauth20').Profile} profile The user profile
 * @param {import('passport-google-oauth20').VerifyCallback} done The verify callback
 */
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id })
    if (user) {
      done(false, user)
    } else {
      const newUser = {
        googleId: profile.id,
        username: profile.displayName,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails?.find(email => email.verified)?.value,
        image: profile.photos[0].value
      }
      user = await User.create(newUser)
      done(false, user)
    }
  } catch (error) {
    console.error(error)
    done(error) // Pass the error to done
  }
}))

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
},
/** @type {import('passport-local').VerifyFunction} */
async function(username, password, callback) {
    try {
      const bcrypt = require('bcrypt')

    const model = await User.findOne({username},{password:1})

    if (!model) {
      // TODO: We just go ahead and add this user now.
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = {username, password: hashedPassword}
      const result = await User.create(user)
      return callback(false, result)
    }

    const validPassword = await bcrypt.compare(password, model.password)
    if (validPassword === false)
      return callback('Wrong password.', false)

    return callback(false, model)
  } catch(error) {
    if (error) { return callback(error) }
  }
}))

passport.serializeUser((user, done) => {
  done(false, user)
})

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id)
    done(false, user)
  } catch (error) {
    done(error)
  }
})

module.exports = passport
