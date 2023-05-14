const Recipe = require('../models/model-recipe.js')

/** @typedef {import('express-serve-static-core').Request} ExpressRequest */
/** @typedef {import('express-serve-static-core').Response} ExpressResponse */

// GET route for getting all contacts that returns a 200 status
const getAll = async (request, response) => {
	try {
		const results = await Recipe.find().exec()

		// Const results = await Recipe.aggregate([
		// 	{
		// 		$lookup: {
		// 			from: 'nutritionInformation',
		// 			localField: 'nutrition_ids',
		// 			foreignField: '_id',
		// 			as: 'nutrition',
		// 		},
		// 	},
		// ]).exec()
		response.status(200).json(results)
	} catch (error) {
		response.status(500).json({message: error.message})
	}
}

/**
 * GET route for getting a single contact that returns a 200 status
 * @param {ExpressRequest} request
 * @param {ExpressResponse} response
 */
const getSingle = async (request, response) => {
	if (!request.params.id) {
		return response.status(400).send('ID is required')
	}

	try {
		const results = await Recipe.findById(request.params.id).exec()
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
 * POST route for creating new contacts that returns the ID of the new contact and a 201 status
 * @param {ExpressRequest} request
 * @param {ExpressResponse} response
 */
const postSingle = async (request, response) => {
	try {
		const result = await Recipe.create(request.body, {validateBeforeSave: true})
		response.status(201).send(result)
	} catch {}
}

/** PUT route for updating a contact that returns a 204 status
 * @param {ExpressRequest} request
 * @param {ExpressResponse} response
 */
const putSingle = async (request, response) => {
	if (!request.params.id) {
		return response.status(400).send('ID is required')
	}

	try {
		const result = await Recipe.findByIdAndUpdate(
			request.params.id,
			request.body,
			{new: true, runValidators: true},
		).exec()

		if (result.$isValid()) {
			response.status(204).json(result)
		} else {
			response.status(404).json({message: `${request.params.id} not found`})
		}
	} catch (error) {
		response.status(500).json({message: error.message})
	}
}

/** DELETE route for deleting a contact that returns a 200 status
 * @param {ExpressRequest} request
 * @param {ExpressResponse} response
 */
const deleteSingle = async (request, response) => {
	if (!request.params.id) {
		return response.status(400).send('ID is required')
	}

	try {
		const result = await Recipe.findByIdAndDelete(request.params.id).exec()
		if (result) {
			response.status(200).json({message: `${request.params.id} deleted`})
		} else {
			response.status(404).json({message: `${request.params.id} not found`})
		}
	} catch (error) {
		response.status(500).json({message: error.message})
	}
}

module.exports = {getAll, getSingle, postSingle, putSingle, deleteSingle}
