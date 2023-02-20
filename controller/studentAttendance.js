const { addMinutes, isAfter } = require("date-fns")
const adminAttendance = require("../model/adminAttendance")
const studentAttenadance = require("../model/studentAttendance")
const error = require("../utils/error")

const getAttendance = async (req, res, next) => {
    const { id } = req.params
    try {
        const adminAtten = await adminAttendance.findById({ '_id': id })
        if (!adminAtten) throw error('Invalid admin id', 400)
        const status = await adminAtten.status

        if (status === 'COMPLETED') throw error('Attendance not active', 400)

        let attendance = await studentAttenadance.findOne({
            User: req.user.id,
            adminAttendance: id
        })

        if (attendance) throw error('Already registered', 400)

        attendance = new studentAttenadance({
            User: req.user.id,
            adminAttendance: id
        })
        attendance.save();
        return res.status(200).send(attendance)
    } catch (error) {
        next(error)
    }
}
const getAttendanceStatus = async (req, res, next) => {
    try {
        const isRunning = await adminAttendance.findOne({ status: 'RUNNING' })
        if (!isRunning) throw error('not running', 400)

        const started = addMinutes(new Date(isRunning.createdAt), isRunning.timelimit)

        console.log(isAfter(new Date(), started));

        if (isAfter(new Date(), started)) {
            isRunning.status = 'COMPLETED'
            await isRunning.save()
        }
        return res.status(200).send(isRunning)
    } catch (error) {
        next(error)
    }
}
module.exports = { getAttendance, getAttendanceStatus }