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

const RequiredDuration = Object.assign({required: true}, ValidDuration)

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

const RequiredDate = Object.assign({required: true}, ValidDate)

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

const RequiredUrl = Object.assign({required: true}, ValidUrl)

const TrimmedString = {
	type: String,
	trim: true,
}

const RequiredString = Object.assign({required: true}, TrimmedString)

/**
 * @param {string|function():string} defaultValue
 */
const defaultString = (defaultValue) =>
	Object.assign({default: defaultValue}, RequiredString)

module.exports = {
	defaultString,
	RequiredDate,
	RequiredDuration,
	RequiredString,
	RequiredUrl,
	TrimmedString,
	ValidDate,
	ValidDuration,
	ValidUrl,
}
