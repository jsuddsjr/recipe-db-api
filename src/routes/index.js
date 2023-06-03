const router = require("express").Router()

router.use("/api", require("./api"))

router.use("/", /* #swagger.ignore = true */ require("./web"))
router.use("/auth", /* #swagger.ignore = true */ require("./auth"))

module.exports = router
