const {Schema, model} = require('mongoose')
const nutritionSchema = require('./schemas/nutrition')

//* Ingredients are just reusable nutrition info for recipes.
// TODO: Enable recipes to embed ingredient info directly.
const ingredientSchema = new Schema(nutritionSchema.obj, {
	timestamps: true,
})

const Ingredient = model('Ingredient', ingredientSchema)

module.exports = Ingredient
