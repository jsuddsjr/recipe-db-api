const Realm = require('realm-web')
const {Router} = require('express')
const config = require('../../config/config')

const router = Router()

router.get('/', async (request, response) => {
	const app = new Realm.App({id: 'recipe-app-nvbhy'})
	const user = await app.logIn(
		Realm.Credentials.emailPassword(config.USER_EMAIL, config.USER_PASSWORD),
		/* FetchProfile */ true,
	)

	response.render('user', {
		title: 'User',
		userid: user.id,
		active: {
			user: true,
		},
	})
})

module.exports = router
