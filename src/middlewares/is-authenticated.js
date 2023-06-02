module.exports = {
	isAuthenticated: (request, response, next) => {
		if (request.isAuthenticated()) {
			return next()
		}

		response
			.status(401)
			.send('You cannot access this resource without being logged in.')
	},
}
