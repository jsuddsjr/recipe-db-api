const {Router} = require('express')
const recipeController = require('../controllers/controller-recipes.js')

// eslint-disable-next-line new-cap
const router = Router()

router.get('/', recipeController.getAll)
router.get('/:id', recipeController.getSingle)
router.post('/', recipeController.postSingle)
router.put('/:id', recipeController.putSingle)
router.delete('/:id', recipeController.deleteSingle)

module.exports = router
