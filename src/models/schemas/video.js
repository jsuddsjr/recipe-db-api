const mongoose = require('mongoose')
const {
	defaultString,
	RequiredString,
	TrimmedString,
	ValidDate,
	ValidDuration,
	ValidUrl,
	RequiredUrl,
} = require('../validators.js');

const videoSchema = new mongoose.Schema(
	{
		'@type': {...defaultString('VideoObject'), description: 'The schema type.'},
		name: {...RequiredString, description: 'The video name.'},
		url: {...RequiredUrl, description: 'The video URL.', alias: 'contentUrl'},
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
);

module.exports = videoSchema
