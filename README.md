# recipe-dp-api

This project was created for an assignment in CSE 341.

> **This api is not intended for serious use.**

The site is currently hosted on Render, but not forever.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/jsuddsjr/recipe-db-api)

## Things I learned while building this project

* [Express](https://www.npmjs.com/package/express) (routes, middleware, body-parser, CORS)
* [Express-Generator](https://www.npmjs.com/package/express-generator) (starter project) -- Because it works.
* [Express-Validator](https://www.npmjs.com/package/express-validator) (request validation) -- *Almost* everything I needed.
* [Mongoose](https://www.npmjs.com/package/mongoose) (models, child schemas, CRUD, validation)
* [Passport Authentication](https://www.npmjs.com/package/passport) (user/pass and OAuth2)
* [Swagger-UI-Express](https://www.npmjs.com/package/swagger-ui-express) (Swagger 2.0, markdown)
* [Swagger-Autogen](https://www.npmjs.com/package/swagger-autogen) (with its many faults)
* [Mongoose-to-Swagger](https://www.npmjs.com/package/mongoose-to-swagger) (with embedded description and examples)
* [Pug (nee Jade)](https://www.npmjs.com/package/pug) (view templates, mixins, variables)
* [Pug-Bootstrap](https://www.npmjs.com/package/pug-bootstrap) -- I started here, but ended up writing my own Bootstrap 5 mixins.
* [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) (environment, response variables)
* [MongoDB](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode) (Atlas server, collections, pipelines, query language)
* [Render.com](https://render.com) (hosting, automatic deployment) -- Where have you been all my life?
* [Schema.org](https://schema.org) (standardized schema) -- With some guidance from [AllRecipes.com](https://allrecipes.com), who use schema everywhere.

## Bugs, workarounds, and observations

* I'm pretty proud of the single CRUD controller that manages all my basic read and write route logic in one place. I just tell it which Mongoose model to use, and it does all the rest.

* Although it's easy to create a standard CRUD controller, it is nearly impossible to get `swagger-autogen` to understand what you are doing. I had to pass all the route files by name, which causes bogus default route paths that show up in Swagger UI, all of which are completely busted.

* I :heart_eyes: PUG! It's truncated syntax and expressive mixin language make me feel powerful. I can create a fully functional Bootstrap-based layout faster than ever. It's too bad that all the pug templates I could find hadn't been updated in ages. I ended up writing my own basic mixins for Bootstrap 5, with a promise that I would keep looking when I had more time...

* OAuth is easy, once you know the right libraries to use. The `passport` middleware made a huge difference, since it returns every OAuth flow in a simplified format. The OAuth flow used to be one of the most confusing aspects of authentication. Not anymore.

* The `express-validator` package provides route validation in Express with a fluent API that *almost* covered all my crazy edge-cases. Although I didn't use it much in this project, I pushed it to the max in [Team7 Final Project](https://github.com/team7byui/team7_final_project).

* Standardized schema (`application/ld+json`) can raise your search results in the Google rankings. Although I don't return my schema to the client in this format, it *should be* easy to get it working. ~~ Famous Last Words

## Requirements

* [x] You get to choose what this project is (Recipe DB)
* [x] Database should store at least two collections (Recipe, Ingredients)
* [x] At least one collection should store documents that have 7 fields or more
* [x] Node project successfully connects to MongoDB
* [x] API routes perform GET, POST, PUT, DELETE requests that are fully functional
* [x] All routes should include data validation and error handling (`mongoose`, `express-validator`)
* [x] Project must incorporate use of OAuth for user management. (Google, GitHub)
* [x] API Documentation is professional, comprehensive, relevant, and accurate (*almost*)
* [x] API is published to Render and can be called from external sources
