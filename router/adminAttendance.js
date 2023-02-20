
const router = require('express').Router()
const adminAttendance = require('../controller/adminAttendance')

router.get("/getEnabel", adminAttendance.getEnable)
router.get("/getStatus", adminAttendance.getStatus)
router.get("/getDisable", adminAttendance.getDisable)


module.exports = router