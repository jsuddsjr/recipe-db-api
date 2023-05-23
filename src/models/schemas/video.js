const mongoose = require('mongoose')
const {
	defaultString,
	RequiredString,
	TrimmedString,
	ValidDate,
	ValidDuration,
	ValidUrl,
} = require('./validators.js')

const videoSchema = new mongoose.Schema(
	{
		'@type': defaultString('VideoObject'),
		name: RequiredString,
		url: ValidUrl,
		description: TrimmedString,
		thumbnailUrl: ValidUrl,
		contentUrl: ValidUrl,
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
