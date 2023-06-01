const mongoose = require('mongoose')
const {
	defaultString,
	RequiredString,
	TrimmedString,
	ValidUrl,
} = require('../validators.js')
const imageSchema = require('./image.js')

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
