module.exports = {
	isAuthenticated(request, response, next) {
		if (request.isAuthenticated()) {
			return next()
		}

		response.status(401).send('Access denied.')
	},
}
