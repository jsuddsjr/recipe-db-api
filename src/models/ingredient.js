const mongoose = require('mongoose')
const nutritionSchema = require('./schemas/nutrition.js')

//* Ingredients are just reusable nutrition info for recipes.
// TODO: Enable recipes to embed ingredient info directly.
const ingredientSchema = new mongoose.Schema(nutritionSchema.obj, {
	timestamps: true,
})

const Ingredient = mongoose.model('ingredient', ingredientSchema)

module.exports = Ingredient
