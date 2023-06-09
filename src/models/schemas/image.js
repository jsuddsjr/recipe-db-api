const {Schema} = require("mongoose")
const {
	defaultString,
	TrimmedString,
	ValidDate,
	ValidUrl,
} = require("../validators")

const imageSchema = new Schema(
	{
		"@type": {...defaultString("ImageObject"), description: "The schema type."},
		url: {
			...ValidUrl,
			example: "https://example.com/image.jpg",
			description: "The image URL.",
		},
		accessibilitySummary: {
			...TrimmedString,
			description: "The image alt text",
		},
		published: {
			...ValidDate,
			description: "The image publish date.",
		},
		height: {
			type: Number,
			example: 300,
			description: "The image height in pixels.",
		},
		width: {
			type: Number,
			example: 400,
			description: "The image width in pixels.",
		},
	},
	{
		_id: false,
	},
)

module.exports = imageSchema
