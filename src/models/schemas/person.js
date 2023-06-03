const {Schema} = require("mongoose")
const {
	defaultString,
	RequiredString,
	ValidEmail,
	ValidUrl,
} = require("../validators")
const imageSchema = require("./image")

const personSchema = new Schema(
	{
		"@type": {...defaultString("Person"), description: "The schema type."},
		name: {...RequiredString, description: "The person name."},
		email: {...ValidEmail, description: "An optional email."},
		url: {...ValidUrl, description: "An optional URL."},
		image: imageSchema,
	},
	{
		_id: false,
	},
)

module.exports = personSchema
