const {Router} = require('express')
const Ingredient = require('../models/model-ingredient.js')

// eslint-disable-next-line new-cap
const router = Router()

// Get all records
router.get('/', async (request, response) => {
	try {
		const records = await Ingredient.find().exec()
		response.send(records)
	} catch (error) {
		response.status(500).send(error.message)
	}
})

// Create a new record
router.post('/', async (request, response) => {
	try {
		const record = await Ingredient.create(request.body)
		await record.save()
		response.send(record)
	} catch (error) {
		response.status(500).send(error.message)
	}
})

// Get record By ID
router.get('/:id', async (request, response) => {
	if (!request.params.id) {
		return response.status(400).send('ID is required')
	}

	try {
		const record = await Ingredient.findById(request.params.id)
		response.send(record)
	} catch (error) {
		response.status(500).send(error.message)
	}
})

// Update record By ID
router.put('/:id', async (request, response) => {
	if (!request.params.id) {
		return response.status(400).send('ID is required')
	}

	try {
		const record = await Ingredient.findByIdAndUpdate(
			request.params.id,
			request.body,
			{new: true, runValidators: true},
		).exec()

		response.send(record)
	} catch (error) {
		response.status(500).send(error.message)
	}
})

// Delete record By ID
router.delete('/:id', async (request, response) => {
	try {
		const record = await Nutrition.findByIdAndDelete(request.params.id)
		response.send(record)
	} catch (error) {
		response.status(500).send(error.message)
	}
})

module.exports = router