const {ObjectId} = require('mongodb')

/**
 * @typedef {import('express').Request} ExpressRequest
 * @typedef {import('express').Response} ExpressResponse
 * @typedef {import('express').NextFunction} ExpressNextFunction
 * @typedef {import('mongoose').Model} MongooseModel
 * @callback ExpressRouteHandler
 * @param {ExpressRequest} req The HTTP request
 * @param {ExpressResponse} res The HTTP response
 * @param {ExpressNextFunction} next The next function in route
 */

/**
 * @param {String} id Name of the id parameter. Default: "id"
 * @returns {ExpressRouteHandler}
 */
const checkObjectId =
	(id = 'id') =>
	(request, response, next) => {
		if (ObjectId.isValid(request.params[id])) return next()
		response.status(400).send('Valid objectId required.')
	}

/**
 * GET route for getting all records that returns a 200 status
 * @param {MongooseModel} model A Mongoose model
 * @returns {ExpressRouteHandler}
 */
const getAll = model => async (request, response) => {
	try {
		const results = await model.find()
		response.status(200).json(results)
	} catch (error) {
		response.status(500).json({message: error.message})
	}
}

/**
 * GET route for getting a single record that returns a 200 status
 * @param {MongooseModel} model A Mongoose model
 * @returns {ExpressRouteHandler}
 */
const getSingle = model => async (request, response) => {
	try {
		const results = await model.findById(request.params.id)
		if (results) {
			response.status(200).json(results)
		} else {
			response.status(404).json({message: `${request.params.id} not found`})
		}
	} catch (error) {
		response.status(500).json({message: error.message})
	}
}

/**
 * POST route for creating new records that returns the ID of the new record and a 201 status
 * @param {MongooseModel} model A Mongoose model
 * @returns {ExpressRouteHandler}
 */
const postSingle = model => async (request, response) => {
	try {
		const result = await model.create(request.body)
		response.status(201).send(result)
	} catch (error) {
		response.status(500).json({message: error.message})
	}
}

/**
 * PUT route for updating a record that returns a 204 status
 * @param {MongooseModel} model A Mongoose model
 * @param {ExpressResponse} response The HTTP response
 */
const putSingle = model => async (request, response) => {
	try {
		const result = await model.findByIdAndUpdate(
			request.params.id,
			request.body,
			{
				new: true,
				runValidators: true,
			},
		)

		if (result.$isValid()) {
			response.status(204).json(result)
		} else {
			response.status(404).json({message: `${request.params.id} not found`})
		}
	} catch (error) {
		response.status(500).json({message: error.message})
	}
}

/** DELETE route for deleting a record that returns a 200 status
 * @param {MongooseModel} model A Mongoose model
 * @returns {ExpressRouteHandler}
 */
const deleteSingle = model => async (request, response) => {
	try {
		const result = await model.findByIdAndDelete(request.params.id)
		if (result) {
			response.status(200).json({message: `${request.params.id} deleted`})
		} else {
			response.status(404).json({message: `${request.params.id} not found`})
		}
	} catch (error) {
		response.status(500).json({message: error.message})
	}
}

module.exports = {
	checkObjectId,
	getAll,
	getSingle,
	postSingle,
	putSingle,
	deleteSingle,
}
