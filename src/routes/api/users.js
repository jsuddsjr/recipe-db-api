const router = require("express").Router()
const crud = require("../../controllers/crud")
const User = require("../../models/user")
const {isAuthorized} = require("../../middlewares/is-authenticated")

router.get("/",
/*
    #swagger.description = 'Get all users.'
    #swagger.responses[200] = {
        description: 'Success',
        schema: { $ref: "#/definitions/UserArray" }
    }
*/
    isAuthorized("admin"),
    crud.getAll(User),
)

router.get("/:id", /*
    #swagger.description = 'Get specified user.'
    #swagger.parameters['id'] = { description: 'Record id' }
    #swagger.responses[200] = {
        description: 'Success',
        schema: { $ref: "#/definitions/User" }
    }
*/
    isAuthorized("admin"),
	crud.checkObjectId(),
	crud.getSingle(User),
)

router.post("/",
/*
    #swagger.description = 'Create a new user.'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'User object.',
        required: true,
        schema: { $ref: "#/definitions/User" }
    }
    #swagger.responses[200] = {
        description: 'Success',
        schema: { $ref: "#/definitions/InsertedDocument" }
    }
*/
    isAuthorized("admin"),
	crud.postSingle(User),
)

router.put("/:id",
/*
    #swagger.description =  'Update specified user.'
    #swagger.parameters['id'] = { description: 'Record id' }
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'User object.',
        required: true,
        schema: { $ref: "#/definitions/User" }
    }
    #swagger.responses[200] = {
        description: 'Success',
        schema: { $ref: "#/definitions/InsertedDocument" }
    }
*/
    isAuthorized("admin"),
	crud.checkObjectId(),
	crud.putSingle(User),
)

router.delete("/:id",
/*
    #swagger.description = 'Delete specified user.'
    #swagger.parameters['id'] = { description: 'Record id' }
*/
    isAuthorized("admin"),
	crud.checkObjectId(),
	crud.deleteSingle(User),
)

module.exports = router
