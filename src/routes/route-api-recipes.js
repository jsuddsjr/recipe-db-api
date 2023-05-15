const {Router} = require('express')
const recipeController = require('../controllers/controller-recipes.js')

// eslint-disable-next-line new-cap
const router = Router()

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     description: Get all recipes.
 *     responses:
 *       200:
 *         description: Success
 *         type: array
 *         items:
 *           $ref: '#/definitions/Recipe'
 *       500:
 *         description: Internal Server Error
 *         type: object
 *         schema:
 *           $ref: '#/definitions/ErrorMessage'
 */

router.get('/', recipeController.getAll)

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
 *         description: Success
 *         type: object
 *         schema:
 *           $ref: '#/definitions/Recipe'
 *       500:
 *         description: Internal Server Error
 *         type: object
 *         schema:
 *           $ref: '#/definitions/ErrorMessage'
 */
router.get('/:id', recipeController.getSingle)

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     description: Create a new recipe.
 *     parameters:
 *     - name: recipe
 *       description: Recipe object
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
router.post('/', recipeController.postSingle)

/**
 * @swagger
 * /api/recipes/{id}:
 *   put:
 *    description: Update specified recipe.
 *    parameters:
 *    - name: id
 *      description: Record id
 *      in: path
 *      required: true
 *      schema:
 *        $ref: '#/definitions/Id'
 *    - name: contact
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
router.put('/:id', recipeController.putSingle)

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
 *         description: Success
 *         type: object
 *         schema:
 *           $ref: '#/definitions/ErrorMessage'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.delete('/:id', recipeController.deleteSingle)

module.exports = router
