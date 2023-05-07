const mongo = require('mongodb').MongoClient
const config = require('../config/config.js')

/** @type {MongoClient} */
let _db

/**
 * @callback InitDbCallback
 * @param {Error} err
 * @param {MongoClient} db
 * @returns {void}
 */

/**
 * Initializes the database connection
 * @param {InitDbCallback} callback
 * @returns {void}
 * @throws {Error}
 */
const initDb = (callback) => {
	if (_db) {
		console.log('Db is already initialized!')
		return callback(null, _db)
	}

	mongo
		.connect(config.MONGO_DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((client) => {
			_db = client
			callback(null, _db)
		})
		.catch((error) => {
			callback(error)
		})
}

/**
 *
 * @param {String} name
 * @returns {Db}
 */
const getDb = (name) => {
	if (!_db) {
		throw new Error('Db not initialized')
	}

	return _db.db(name)
}

module.exports = {initDb, getDb}
