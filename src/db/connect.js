const mongoose = require('mongoose')
const config = require('../config/config.js')

/** @type {mongoose.Mongoose} */
let _db

/**
 * @callback InitDbCallback
 * @param {Error} err Error object
 * @param {mongoose.Mongoose} db The database connection
 * @returns {void}
 */

/**
 * Initializes the database connection
 * @param {InitDbCallback} callback The callback function
 * @returns {void}
 */
const initDb = callback => {
	if (_db) {
		console.log('Db is already initialized!')
		return callback(null, _db)
	}

	mongoose.connect(config.MONGO_DB_URL).then(
		value => {
			_db = value
			callback(null, _db)
		},
		error => {
			callback(error)
		},
	)
}

module.exports = {initDb}
