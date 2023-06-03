const router = require("express").Router()
const crud = require("../../controllers/crud")
const Recipe = require("../../models/recipe")
const {isAuthenticated} = require("../../middlewares/is-authenticated")

router.get("/",
/*
    #swagger.description = 'Get all recipes.'
    #swagger.responses[200] = {
        description: 'Success',
        schema: { $ref: "#/definitions/RecipeArray" }
    }
*/
    crud.getAll(Recipe),
)

router.get("/:id", /*
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

router.post("/",
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
    isAuthenticated,
    (request, response, next) => {
        // Add owner to request body
        request.body.owner = request.user._id
        next()
    },
	crud.postSingle(Recipe),
)

router.put("/:id",
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
    isAuthenticated,
	crud.checkObjectId(),
	crud.putSingle(Recipe),
)

router.delete("/:id",
/*
    #swagger.description = 'Delete specified recipe.'
    #swagger.parameters['id'] = { description: 'Record id' }
*/
    isAuthenticated,
	crud.checkObjectId(),
	crud.deleteSingle(Recipe),
)

module.exports = router
