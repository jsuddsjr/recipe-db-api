const {Router} = require('express')
const crud = require('../../controllers/crud.js')
const Recipe = require('../../models/recipe.js')

// eslint-disable-next-line new-cap
const router = Router()

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     description: Get all recipes.
 *     responses:
 *       200:
 *         description: OK
 *         type: array
 *         items:
 *           schema:
 *             $ref: '#/definitions/Recipe'
 *       500:
 *         description: Internal Server Error
 *         type: object
 *         schema:
 *           $ref: '#/definitions/ErrorMessage'
 */

router.get('/', crud.getAll(Recipe))

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     description: Get specified recipe.
 *     parameters:
 *     - name: id
 *       description: Record id
 *       in: path
 *       required: true
 *       schema:
 *         $ref: '#/definitions/Id'
 *     responses:
 *       200:
 *         description: OK
 *         type: object
 *         schema:
 *           $ref: '#/definitions/Recipe'
 *       500:
 *         description: Internal Server Error
 *         type: object
 *         schema:
 *           $ref: '#/definitions/ErrorMessage'
 */
router.get('/:id', crud.checkObjectId(), crud.getSingle(Recipe))

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     description: Create a new recipe.
 *     consumes:
 *     - application/json
 *     - application/x-www-form-urlencoded
 *     parameters:
 *     - name: recipe
 *       description: Recipe object or array of recipe objects
 *       in: body
 *       required: true
 *       schema:
 *         $ref: '#/definitions/Recipe'
 *     responses:
 *       201:
 *         description: Created
 *         type: object
 *         schema:
 *           $ref: '#/definitions/Recipe'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 *         type: object
 *         schema:
 *           $ref: '#/definitions/ErrorMessage'
 */
router.post('/', crud.checkObjectId(), crud.postSingle(Recipe))

/**
 * @swagger
 * /api/recipes/{id}:
 *   put:
 *    description: Update specified recipe.
 *    consumes:
 *     - application/json
 *     - application/x-www-form-urlencoded
 *    parameters:
 *    - name: id
 *      description: Record id
 *      in: path
 *      required: true
 *      schema:
 *        $ref: '#/definitions/Id'
 *    - name: recipe
 *      description: Recipe object
 *      in: body
 *      required: true
 *      schema:
 *        $ref: '#/definitions/Recipe'
 *    responses:
 *      204:
 *        description: Success
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server Error
 *        type: object
 *        schema:
 *          $ref: '#/definitions/ErrorMessage'
 */
router.put('/:id', crud.checkObjectId(), crud.putSingle(Recipe))

/**
 * @swagger
 * /api/recipes/{id}:
 *   delete:
 *     description: Delete specified recipe.
 *     parameters:
 *     - name: id
 *       description: Record id
 *       in: path
 *       required: true
 *       schema:
 *         $ref: '#/definitions/Id'
 *     responses:
 *       200:
 *         description: OK
 *         type: object
 *         schema:
 *           $ref: '#/definitions/ErrorMessage'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.delete('/:id', crud.checkObjectId(), crud.deleteSingle(Recipe))

module.exports = router
