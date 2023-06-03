const {ObjectId} = require("mongodb")

/**
 * Reads MongoDB query from body, and field projection from query string.
 * @param {import('mongoose').Model} model The model to query
 * @param {import('express').Request} request The express request object
 * @returns {any} The query results
 */
const queryFromRequest = async (model, request) => {
	// Body as array is for aggregation pipelines
	if (Array.isArray(request.body)) {
		return await model.aggregate(request.body)
	}

	// Body as object is for find queries
	const query = Object.keys(request.body).length > 0 ? new model(request.body) : {}
	const projection = request.query.fields?.split(",")
		.map(s => s.trim())
		// eslint-disable-next-line unicorn/no-array-reduce
		.reduce((previous, key) => {
			previous[key] = 1; return previous
		}, {})

	// eslint-disable-next-line unicorn/no-array-method-this-argument
	return await model.find(query, projection)
}

/**
 * @param {string} id Name of the id parameter. Default: "id"
 * @returns {import('express').RequestHandler} Express middleware
 */
const checkObjectId =
	(id = "id") =>
	(request, response, next) => {
		if (ObjectId.isValid(request.params[id])) return next()
		response.status(400).send("Valid objectId required.")
	}

/**
 * GET route for getting all records that returns a 200 status
 * @param {import('mongoose').Model} model A Mongoose model
 * @param {object[]} [populate] Array of child documents to include with results
 * @returns {Promise<import('express').RequestHandler>} Express middleware
 */
const getAll = (model, populate=[]) => async (request, response) => {
	try {
		const results = await queryFromRequest(model, request).populate(populate)
		response.status(200).json(results)
	} catch (error) {
		response.status(500).json({message: error.message})
	}
}

/**
 * GET route for getting a single record that returns a 200 status
 * @param {import('mongoose').Model} model A Mongoose model
 * @returns {Promise<import('express').RequestHandler>} Express middleware
 */
const getSingle = (model) => async (request, response) => {
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
 * @param {import('mongoose').Model} model A Mongoose model
 * @returns {Promise<import('express').RequestHandler>} Express middleware
 */
const postSingle = (model) => async (request, response) => {
	try {
		const result = await model.create(request.body)
		response.set("Location", `/api/${model.collection.collectionName}/${result._id}`)
		response.status(201).send(result)
	} catch (error) {
		response.status(500).json({message: error.message})
	}
}

/**
 * PUT route for updating a record that returns a 204 status
 * @param {import('mongoose').Model} model A Mongoose model
 * @returns {Promise<import('express').RequestHandler>} Express middleware
 */
const putSingle = (model) => async (request, response) => {
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

/**
 * DELETE route for deleting a record that returns a 200 status
 * @param {import('mongoose').Model} model A Mongoose model
 * @returns {Promise<import('express').RequestHandler>} Express middleware
 */
const deleteSingle = (model) => async (request, response) => {
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
