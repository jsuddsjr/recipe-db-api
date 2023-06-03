module.exports = {
	/**
	 * Checks if the user is authenticated.
	 * @param {import("express").Request} request The request object.
	 * @param {import("express").Response} response The response object.
	 * @param {import("express").NextFunction} next The next function.
	 * @returns {void}
	 */
	isAuthenticated: (request, response, next) => {
		if (request.isAuthenticated && request.isAuthenticated()) {
			return next()
		}

		response
			.status(401)
			.send("You cannot access this resource without being logged in.")
	},
	/**
	 * The role to check.
	 * @param {string} role The role to check.
	 * @returns {import("express").RequestHandler} Express middleware.
	 */
	isAuthorized: (role) => (request, response, next) => {
		if (request.isAuthenticated() && request.user.role === role) {
			return next()
		}

		response
			.status(401)
			.send("You cannot access this resource without being logged in as an admin.")
	}
}
