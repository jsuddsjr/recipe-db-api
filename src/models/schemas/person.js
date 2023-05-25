const mongoose = require('mongoose')
const imageSchema = require('./schemas/image.js')
const {
	defaultString,
	RequiredString,
	TrimmedString,
	ValidUrl,
} = require('./validators.js')

const personSchema = new mongoose.Schema(
	{
		'@type': defaultString('Person'),
		name: RequiredString,
		email: TrimmedString,
		url: ValidUrl,
		image: imageSchema,
	},
	{
		_id: false,
	},
)

module.exports = personSchema