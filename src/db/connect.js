const mongoose = require("mongoose")
const config = require("../config/config")

/** @type {mongoose.Mongoose} */
let _database

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
const initDatabase = callback => {
	if (_database) {
		console.log("Db is already initialized!")
		return callback(false, _database)
	}

	mongoose.connect(config.MONGO_DB_URL, {
		dbName: "recipes"
	}).then(
		value => {
			_database = value
			callback(false, _database)
		},
		error => {
			callback(error)
		},
	)
}

module.exports = {initDb: initDatabase}
