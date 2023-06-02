const {Router} = require('express')
const Ingredient = require('../../models/ingredient.js')
const crud = require('../../controllers/crud.js')
const {isAuthenticated} = require('../../middlewares/is-authenticated.js')

const router = Router()

// Get all records
router.get('/', crud.getAll(Ingredient))

// Get record By ID
router.get('/:id', crud.checkObjectId(), crud.getSingle(Ingredient))

// Create a new record
router.post('/', isAuthenticated, crud.postSingle(Ingredient))

// Update record By ID
router.put(
	'/:id',
	isAuthenticated,
	crud.checkObjectId(),
	crud.putSingle(Ingredient),
)

// Delete record By ID
router.delete('/:id', isAuthenticated, crud.checkObjectId(), crud.deleteSingle(Ingredient))

module.exports = router
