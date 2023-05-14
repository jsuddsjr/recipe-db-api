const {Router} = require('express')
const User = require('../models/model-user.js')

// eslint-disable-next-line new-cap
const router = Router()

// Get all users
router.get('/', async (request, response) => {
	try {
		const users = await User.find()
		response.send(users)
	} catch (error) {
		response.status(500).send(error.message)
	}
})

// Create a new user
router.post('/', async (request, response) => {
	try {
		const user = User.create(request.body, {runValidators: true})
		response.send(user)
	} catch (error) {
		response.status(500).send(error.message)
	}
})

// Get user By ID
router.get('/:id', async (request, response) => {
	try {
		const user = await User.findById(request.params.id)
		response.send(user)
	} catch (error) {
		response.status(500).send(error.message)
	}
})

// Update user By ID
router.put('/:id', async (request, response) => {
	try {
		const user = await User.findByIdAndUpdate(request.params.id, request.body, {
			new: true,
			runValidators: true,
		})
		response.send(user)
	} catch (error) {
		response.status(500).send(error.message)
	}
})

// Delete user By ID
router.delete('/:id', async (request, response) => {
	try {
		const user = await User.findByIdAndDelete(request.params.id)
		response.send(user)
	} catch (error) {
		response.status(500).send(error.message)
	}
})

module.exports = router
