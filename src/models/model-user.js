const mongoose = require('mongoose')
const imageSchema = require('./model-image-schema.js')
const {
	defaultString,
	RequiredString,
	TrimmedString,
	ImmutableObjectId,
} = require('./validators.js')

const userSchema = new mongoose.Schema({
	'@type': defaultString('Person'),
	_id: ImmutableObjectId,
	name: RequiredString,
	email: RequiredString,
	givenName: TrimmedString,
	familyName: TrimmedString,
	image: imageSchema,
	follows: [userSchema],
	keywords: [TrimmedString],
})

const User = mongoose.model('users', userSchema)

module.exports = User
