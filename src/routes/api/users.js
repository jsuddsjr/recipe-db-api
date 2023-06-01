const {Router} = require('express')
const crud = require('../../controllers/crud.js')
const User = require('../../models/user.js')

const router = Router()

// Get all users
router.get('/', crud.getAll(User))

// Create a new user
router.post('/', crud.postSingle(User))

// Get user By ID
router.get('/:id', crud.checkObjectId(), crud.getSingle(User))

// Update user By ID
router.put('/:id', crud.checkObjectId(), crud.putSingle(User))

// Delete user By ID
router.delete('/:id', crud.checkObjectId(), crud.deleteSingle(User))

module.exports = router
