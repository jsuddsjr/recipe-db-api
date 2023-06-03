const {Schema, model} = require('mongoose')
const imageSchema = require('./schemas/image')
const bcrypt = require('bcrypt')
const {
	defaultString,
	RequiredString,
	TrimmedString,
	ValidEmail,
	ValidUrl,
} = require('./validators')

const userSchema = new Schema(
	{
		'@context': {
			...defaultString('http://schema.org'),
			description: 'The schema context.',
		},
		'@type': { ...defaultString('Person'), description: 'The schema type.' },
		identifier: {
			...TrimmedString,
			select: false,
			description: 'Service identifier for Google, LinkedIn, etc'
		},
		displayName: {
			...RequiredString,
			example: 'John Doe',
			description: 'The user name.',
		},
		email: {
			...ValidEmail,
			example: 'john.doe@example.com',
			description: 'The user email.',
		},
		url: {
			...ValidUrl,
			example: 'https://example.com',
			description: 'The user URL.',
		},
		image: { type: imageSchema, description: 'An optional user image.' },
		keywords: [{ ...TrimmedString, description: 'A collection of keywords.' }],
		password: { ...TrimmedString, select: false, description: 'Local password (not visible to default view)' },
		role: {...TrimmedString, description: 'The user role.', enum: ['user', 'admin'], default: 'user'}
	},
	{
		timestamps: true,
		methods: {
			/**
			 * Verify a plain text password. (Requires model to be selected with password field.)
			 * @param {string} password Password to verify.
			 * @returns {Promise<boolean>}
			 */
			verifyPassword: function (password) {
				return bcrypt.compare(password, this.password)
			},
		},
		virtuals: {
			password: {
				/**
				 * Stored the password as encrypted hash.
				 * @param {string} password A plain text password.
				 * @returns {Promise<void>}
				 */
				put: async function (password) {
					this.password = await bcrypt.hash(password, 16)
				}
			}
		}
	},
)

const User = model('User', userSchema)

// TODO: Add references to other schemas.
// userSchema.add({
// 	followsIds: foreignKey(User, 'Favorite user ids.'),
// 	favoriteIds: foreignKey(Recipe, 'Favorite recipe ids.'),
// })

module.exports = User
