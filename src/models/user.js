const mongoose = require('mongoose')
const imageSchema = require('./schemas/image.js')
const {
	defaultString,
	RequiredString,
	TrimmedString,
	ValidUrl,
} = require('./validators.js')

const userSchema = new mongoose.Schema(
	{
		'@context': defaultString('http://schema.org'),
		'@type': defaultString('Person'),
		name: RequiredString,
		email: RequiredString,
		url: ValidUrl,
		image: imageSchema,
		followsIds: ['ObjectId'],
		favoriteIds: ['ObjectId'],
		keywords: [TrimmedString],
	},
	{
		timestamps: true,
	},
)

// Cannot add 'follows' until base schema is defined.
userSchema.add({
	follows: [userSchema],
})

const User = mongoose.model('user', userSchema)

module.exports = User
