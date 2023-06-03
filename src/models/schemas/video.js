const {Schema} = require('mongoose')
const {
	defaultString,
	RequiredString,
	TrimmedString,
	ValidDate,
	ValidDuration,
	ValidUrl,
	RequiredUrl,
} = require('../validators')

const videoSchema = new Schema(
	{
		'@type': {...defaultString('VideoObject'), description: 'The schema type.'},
		name: {...RequiredString, description: 'The video name.'},
		url: { ...RequiredUrl, description: 'The video URL.' },
		// TODO: Figure out how to make a working alias.
		contentUrl: {...RequiredUrl, description: 'The video URL.'},
		description: {...TrimmedString, description: 'The video description.'},
		thumbnailUrl: {...ValidUrl, description: 'An optional thumbnail URL.'},
		embedUrl: {...ValidUrl, description: 'An optional embed URL.'},
		uploadDate: {...ValidDate, description: 'An optional upload date.'},
		duration: {...ValidDuration, description: 'An optional duration.'},
		expires: {...ValidDate, description: 'An optional expiration date.'},
	},
	{
		_id: false,
	},
)

module.exports = videoSchema
