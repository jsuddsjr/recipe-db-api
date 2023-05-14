const mongoose = require('mongoose')
const imageSchema = require('./model-image-schema.js')
const {
	defaultString,
	RequiredString,
	TrimmedString,
} = require('./validators.js')

const userSchema = new mongoose.Schema({
	'@type': defaultString('Person'),
	_id: 'ObjectId',
	name: RequiredString,
	email: RequiredString,
	givenName: TrimmedString,
	familyName: TrimmedString,
	image: imageSchema,
	followsIds: ['ObjectId'],
	favoriteIds: ['ObjectId'],
	keywords: [TrimmedString],
})

// Cannot add 'follows' until base schema is defined.
userSchema.add({
	follows: [userSchema],
})

const User = mongoose.model('users', userSchema)

module.exports = User
