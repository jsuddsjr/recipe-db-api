const {Schema, model} = require("mongoose")
const nutritionSchema = require("./schemas/nutrition")
const { RequiredString } = require("./validators")

//* Ingredients are just reusable nutrition info for recipes.
// TODO: Enable recipes to embed ingredient info directly.
const ingredientSchema = new Schema(
	{
		...nutritionSchema.obj,
		name: {
			...RequiredString,
			example: "Apple",
			description: "The name of the food.",
		},
		__v: { type: Number, select: false },
	},
	{
		timestamps: true,
	}
)

const Ingredient = model("Ingredient", ingredientSchema)

module.exports = Ingredient
