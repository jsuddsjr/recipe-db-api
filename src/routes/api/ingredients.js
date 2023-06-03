const router = require("express").Router()
const Ingredient = require("../../models/ingredient")
const crud = require("../../controllers/crud")
const {isAuthenticated} = require("../../middlewares/is-authenticated")

router.get("/",
/*
    #swagger.description = 'Get all recipes.'
    #swagger.responses[200] = {
        description: 'Success',
        schema: { $ref: "#/definitions/IngredientArray" }
    }
*/
    crud.getAll(Ingredient),
)

router.get("/:id", /*
    #swagger.description = 'Get specified recipe.'
    #swagger.parameters['id'] = { description: 'Record id' }
    #swagger.responses[200] = {
        description: 'Success',
        schema: { $ref: "#/definitions/Ingredient" }
    }
*/
	crud.checkObjectId(),
	crud.getSingle(Ingredient),
)

router.post("/",
/*
    #swagger.description = 'Create a new recipe.'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Ingredient object.',
        required: true,
        schema: { $ref: "#/definitions/Ingredient" }
    }
    #swagger.responses[200] = {
        description: 'Success',
        schema: { $ref: "#/definitions/InsertedDocument" }
    }
*/
    isAuthenticated,
	crud.postSingle(Ingredient),
)

router.put("/:id",
/*
    #swagger.description =  'Update specified recipe.'
    #swagger.parameters['id'] = { description: 'Record id' }
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Ingredient object.',
        required: true,
        schema: { $ref: "#/definitions/Ingredient" }
    }
    #swagger.responses[200] = {
        description: 'Success',
        schema: { $ref: "#/definitions/InsertedDocument" }
    }
*/
    isAuthenticated,
	crud.checkObjectId(),
	crud.putSingle(Ingredient),
)

router.delete("/:id",
/*
    #swagger.description = 'Delete specified recipe.'
    #swagger.parameters['id'] = { description: 'Record id' }
*/
    isAuthenticated,
	crud.checkObjectId(),
	crud.deleteSingle(Ingredient),
)

module.exports = router
