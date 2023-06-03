const {Schema, model} = require("mongoose")
const imageSchema = require("./schemas/image")
const bcrypt = require("bcrypt")
const {
	defaultString,
	RequiredString,
	TrimmedString,
	ValidEmail,
	ValidUrl,
} = require("./validators")

const userSchema = new Schema(
	{
		"@context": {
			...defaultString("http://schema.org"),
			description: "The schema context.",
		},
		"@type": { ...defaultString("Person"), description: "The schema type." },
		identifier: {
			...TrimmedString,
			select: false,
			description: "Service identifier for Google, LinkedIn, etc"
		},
		displayName: {
			...RequiredString,
			example: "John Doe",
			description: "The user name.",
		},
		email: {
			...ValidEmail,
			example: "john.doe@example.com",
			description: "The user email.",
		},
		url: {
			...ValidUrl,
			example: "https://example.com",
			description: "The user URL.",
		},
		image: { type: imageSchema, description: "An optional user image." },
		keywords: [{ ...TrimmedString, description: "A collection of keywords." }],
		hash: { ...TrimmedString, select: false, description: "Password hash (not visible to default view)" },
		role: { ...TrimmedString, description: "The user role.", enum: ["user", "admin"], default: "user" },
		__v: { type: Number, select: false },
	},
	{
		timestamps: true,
		methods: {
			/**
			 * Verify a plain text password. (Requires model to be selected with hash field.)
			 * @param {string} password Password to verify.
			 * @returns {Promise<boolean>} True if the password matches.
			 */
			verifyPassword: function (password) {
				return this.hash && bcrypt.compare(password, this.hash)
			},
			/**
			 * Set a plain text password.
			 * @param {string} password The plain text password to hash.
			 */
			setPassword: function (password) {
				this.hash = bcrypt.hashSync(password, 16)
			}
		}
	},
)

const User = model("User", userSchema)

// TODO: Add references to other schemas.
// userSchema.add({
// 	followsIds: foreignKey(User, 'Favorite user ids.'),
// 	favoriteIds: foreignKey(Recipe, 'Favorite recipe ids.'),
// })

module.exports = User
