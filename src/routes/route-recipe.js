const express = require('express')
const recipeController = require('../controllers/controller-recipe.js')

const router = new express.Router()

router.get('/', recipeController.getAll)
router.get('/:id', recipeController.getSingle)
router.post('/', recipeController.postSingle)
router.put('/:id', recipeController.putSingle)
router.delete('/:id', recipeController.deleteSingle)

module.exports = router
