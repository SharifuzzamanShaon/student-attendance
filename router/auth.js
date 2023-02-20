const router = require('express').Router()
const authController = require('../controller/auth')
router.post("/reg", authController.registerController)

router.post("/login", authController.loginController)


module.exports= router