const GoogleStrategy = require("passport-google-oauth20").Strategy
const LocalStrategy = require("passport-local").Strategy
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy
const GitHubStrategy = require("passport-github2").Strategy
const config = require("../config/config")

const passport = require("passport")
const { User } = require("../models")

/**
 * A general verify function for passport strategies.
 * @param {string} accessToken API access token from the provider
 * @param {string} refreshToken Refresh token from the provider
 * @param {import('passport').Profile} profile The user's profile
 * @param {import('passport').VerifyFunction} done Callback function
 * @returns {Promise<void>}
 */
// eslint-disable-next-line no-unused-vars
const standardVerify = async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ identifier: profile.id })
    if (!user) {
      const email = Array.isArray(profile.emails)
        ? profile.emails[0].value
        : undefined
      const image = Array.isArray(profile.photos)
        ? { url: profile.photos[0].value }
        : undefined
      user = await User.create({
        identifier: profile.id,
        displayName: profile.displayName,
        email,
        image
      })
    }
    done(false, user)
  } catch (error) {
    console.error(error)
    done(error) // Pass the error to done
  }
}

passport. use(new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: config.HOST_URL + "/auth/google/callback",
  scope: ["profile", "email"],
}, standardVerify))

passport.use(new GitHubStrategy({
  clientID: config.GITHUB_CLIENT_ID,
  clientSecret: config.GITHUB_CLIENT_SECRET,
  callbackURL: config.HOST_URL + "/auth/github/callback",
  scope: ["profile", "email"],
}, standardVerify))

passport.use(new LinkedInStrategy({
  clientID: config.LINKEDIN_CLIENT_ID,
  clientSecret: config.LINKEDIN_CLIENT_SECRET,
  callbackURL: config.HOST_URL + "/auth/linkedin/callback",
  scope: ["r_liteprofile", "r_emailaddress"]
}, standardVerify))

passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
},
/** @type {import('passport-local').VerifyFunction} */
async function(email, password, done) {
  try {
    const model = await User.findOne({ email }, { hash: 1 })
    if (!model) {
      const user = new User({ displayName: email, email })
      user.setPassword(password)  // Saved as a hash.
      const result = await user.save()
      return done(false, result)
    } else if (model.verifyPassword(password)) {
      return done(false, model)
    } else {
      return done("Wrong password.")
    }
  } catch(error) {
    done(error)
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
