const {Router} = require('express')
const crud = require('../../controllers/crud.js')
const Recipe = require('../../models/recipe.js')

const router = Router()

router.get(
	'/',
	/*
        #swagger.description = 'Get all recipes.'
        #swagger.responses[200] = {
            description: 'Success',
            schema: { $ref: "#/definitions/RecipeArray" }
        }
    */
	crud.getAll(Recipe),
)

router.get(
	'/:id',
	/*
        #swagger.description = 'Get specified recipe.'
        #swagger.parameters['id'] = { description: 'Record id' }
        #swagger.responses[200] = {
            description: 'Success',
            schema: { $ref: "#/definitions/Recipe" }
        }
    */
	crud.checkObjectId(),
	crud.getSingle(Recipe),
)

router.post(
	'/',
	/*
        #swagger.description = 'Create a new recipe.'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Recipe object.',
            required: true,
            schema: { $ref: "#/definitions/Recipe" }
        }
        #swagger.responses[200] = {
            description: 'Success',
            schema: { $ref: "#/definitions/InsertedDocument" }
        }
    */
	crud.postSingle(Recipe),
)

router.put(
	'/:id',
	/*
        #swagger.description =  'Update specified recipe.'
        #swagger.parameters['id'] = { description: 'Record id' }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Recipe object.',
            required: true,
            schema: { $ref: "#/definitions/Recipe" }
        }
        #swagger.responses[200] = {
            description: 'Success',
            schema: { $ref: "#/definitions/InsertedDocument" }
        }
    */
	crud.checkObjectId(),
	crud.putSingle(Recipe),
)

router.delete(
	'/:id',
	/*
        #swagger.description = 'Delete specified recipe.'
        #swagger.parameters['id'] = { description: 'Record id' }
    */
	crud.checkObjectId(),
	crud.deleteSingle(Recipe),
)

module.exports = router
