const mongoose = require('mongoose')
const {
	defaultString,
	TrimmedString,
	ValidDate,
	ValidUrl,
} = require('./validators.js')

const imageSchema = new mongoose.Schema({
	'@type': defaultString('ImageObject'),
	contentUrl: ValidUrl,
	accessibilitySummary: TrimmedString,
	published: ValidDate,
	height: Number,
	width: Number,
})

module.exports = imageSchema
