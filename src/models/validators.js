const {pattern} = require('iso8601-duration')
const {isValidISODateString} = require('iso-datestring-validator')
const {isEmail} = require('is-email-validation')

const ValidDuration = {
	type: String,
	trim: true,
	validate: {
		validator(value) {
			return pattern.test(value)
		},
		message: props => `${props.value} not a valid ISO8601 duration`,
	},
	example: 'PT1H',
	description: 'The duration in ISO8601 format.',
}

const RequiredDuration = {required: true, ...ValidDuration}

const ValidDate = {
	type: String,
	trim: true,
	validate: {
		validator(value) {
			return isValidISODateString(value)
		},
		message: props => `${props.value} is not a valid ISO8601 date`,
	},
	example: '2020-01-01T00:00:00.000Z',
	description: 'The date in ISO8601 format.',
}

const RequiredDate = {required: true, ...ValidDate}

const ValidUrl = {
	type: String,
	trim: true,
	validate: {
		validator(value) {
			try {
				return Boolean(URL(value))
			} catch {
				return false
			}
		},
		message: props => `${props.value} not a valid URL format`,
	},
	example: 'https://example.com',
	description: 'The URL.',
}

const RequiredUrl = {required: true, ...ValidUrl}

const ValidEmail = {
	type: String,
	trim: true,
	lowercase: true,
	validate: {
		validator: isEmail,
		message: props => `${props.value} not a valid email format`,
	},
	example: 'john.doe@example.com',
	description: 'The email.',
}

const RequiredEmail = {required: true, ...ValidEmail}

const TrimmedString = {
	type: String,
	trim: true,
}

const RequiredString = {required: true, ...TrimmedString}

const ValidMetricWeightString = {
	type: String,
	trim: true,
	validate: {
		validator(value) {
			return /^\d+ m?g$/.test(value)
		},
		message: props => `${props.value} should match "[0-9]+ m?g" pattern`,
	},
	example: '100 mg',
	description: 'The weight in grams or milligrams.',
}

const ValidCalorieString = {
	type: String,
	trim: true,
	validate: {
		validator(value) {
			return /^\d+ (?:kcal|calories)$/.test(value)
		},
		message: props =>
			`${props.value} should match "[0-9]+ (kcal|calories)" pattern`,
	},
	example: '100 kcal',
	description: 'The number of calories.',
}

const ValidServingSizeString = {
	type: String,
	trim: true,
	validate: {
		validator(value) {
			return /^\d+ (?:tbsp|tsp|cup|oz|g|mg)$/.test(value)
		},
		message: props =>
			`${props.value} should match "[0-9]+ (tbsp|tsp|cup|oz|g|mg)" pattern`,
	},
	example: '1 cup',
	description: 'The serving size (tsp, tbsp, cup, oz, g, or mg).',
}

/**
 * Helper function to create a default string.
 * @param {string} defaultValue The default value.
 * @returns {object} The config object.
 */
const defaultString = defaultValue => ({
	default: defaultValue,
	...RequiredString,
})

/**
 * Helper function to create a reference to another model.
 * @param {import('mongoose').Model} model The reference model.
 * @param {string} description The description of the reference.
 * @returns {object[]} The config object.
 */
const foreignKey = (
	model,
	description = `References to ${model.modelName}`,
) => ({type: 'ObjectId', description, ref: model.modelName})

module.exports = {
	defaultString,
	foreignKey,
	RequiredDate,
	RequiredDuration,
	RequiredEmail,
	RequiredString,
	RequiredUrl,
	TrimmedString,
	ValidDate,
	ValidDuration,
	ValidEmail,
	ValidCalorieString,
	ValidMetricWeightString,
	ValidServingSizeString,
	ValidUrl,
}
