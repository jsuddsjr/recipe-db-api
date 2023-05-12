const mongoose = require('mongoose')
const {
	defaultString,
	RequiredUrl,
	TrimmedString,
	RequiredDate,
} = require('./validators.js')

const imageSchema = new mongoose.Schema({
	'@type': defaultString('ImageObject'),
	contentUrl: RequiredUrl,
	accessibilitySummary: TrimmedString,
	published: RequiredDate,
	height: Number,
	width: Number,
})

module.exports = imageSchema
