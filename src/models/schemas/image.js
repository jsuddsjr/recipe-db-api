const mongoose = require('mongoose')
const {
	defaultString,
	TrimmedString,
	ValidDate,
	ValidUrl,
} = require('../validators.js')

const imageSchema = new mongoose.Schema(
	{
		'@type': defaultString('ImageObject'),
		url: ValidUrl,
		contentUrl: ValidUrl,
		accessibilitySummary: TrimmedString,
		published: ValidDate,
		height: Number,
		width: Number,
	},
	{
		_id: false,
	},
)

module.exports = imageSchema
