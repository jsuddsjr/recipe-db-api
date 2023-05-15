const {pattern} = require('iso8601-duration')
const {isValidISODateString} = require('iso-datestring-validator')

const ValidDuration = {
	type: String,
	trim: true,
	validate: {
		validator(value) {
			return pattern.test(value)
		},
		message: (props) => `${props.value} not a valid ISO8601 duration`,
	},
}

const RequiredDuration = {required: true, ...ValidDuration}

const ValidDate = {
	type: String,
	trim: true,
	validate: {
		validator(value) {
			return isValidISODateString(value)
		},
		message: (props) => `${props.value} is not a valid ISO8601 date`,
	},
}

const RequiredDate = {required: true, ...ValidDate}

const ValidUrl = {
	type: String,
	trim: true,
	validate: {
		validator(value) {
			try {
				return Boolean(new URL(value))
			} catch {
				return false
			}
		},
		message: (props) => `${props.value} not a valid URL format`,
	},
}

const RequiredUrl = {required: true, ...ValidUrl}

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
		message: (props) => `${props.value} should match "[0-9]+ m?g" pattern`,
	},
}

const ValidCalorieString = {
	type: String,
	trim: true,
	validate: {
		validator(value) {
			return /^\d+ (?:kcal|calories)$/.test(value)
		},
		message: (props) =>
			`${props.value} should match "[0-9]+ (kcal|calories)" pattern`,
	},
}

const ValidServingSizeString = {
	type: String,
	trim: true,
	validate: {
		validator(value) {
			return /^\d+ (?:tbsp|tsp|cup|oz|g|mg)$/.test(value)
		},
		message: (props) =>
			`${props.value} should match "[0-9]+ (tbsp|tsp|cup|oz|g|mg)" pattern`,
	},
}

/**
 * @param {string|function():string} defaultValue
 */
const defaultString = (defaultValue) => ({
	default: defaultValue,
	...RequiredString,
})

module.exports = {
	defaultString,
	RequiredDate,
	RequiredDuration,
	RequiredString,
	RequiredUrl,
	TrimmedString,
	ValidDate,
	ValidDuration,
	ValidCalorieString,
	ValidMetricWeightString,
	ValidServingSizeString,
	ValidUrl,
}
