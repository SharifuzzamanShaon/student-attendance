const router = require('express').Router()

const studentAttenadance = require('../controller/studentAttendance')

router.get("/getAttendanceStatus", studentAttenadance.getAttendanceStatus)
router.get("/:id", studentAttenadance.getAttendance)

module.exports = router