const mongoose = require('mongoose')
const {
	defaultString,
	RequiredString,
	RequiredUrl,
	TrimmedString,
	ValidDate,
	ValidDuration,
	ValidUrl,
} = require('./validators.js')

const videoSchema = new mongoose.Schema(
	{
		'@type': defaultString('VideoObject'),
		name: RequiredString,
		description: TrimmedString,
		thumbnailUrl: ValidUrl,
		contentUrl: RequiredUrl,
		embedUrl: ValidUrl,
		uploadDate: ValidDate,
		duration: ValidDuration,
		expires: ValidDate,
	},
	{
		_id: false,
	},
)

module.exports = videoSchema
