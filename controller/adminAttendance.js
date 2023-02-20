const adminAttendance = require("../model/adminAttendance")
const error = require('../utils/error')
const { addMinutes, isAfter } = require('date-fns')

const getEnable = async (req, res, next) => {
    try {
        const isRunning = await adminAttendance.findOne({ status: 'RUNNING' })
        if (isRunning) throw error('Already running', 400)
        const running = await new adminAttendance({})
        await running.save()
        return res.status(200).send(running)
    } catch (error) {
        next(error)
    }
}

const getStatus = async (req, res, next) => {
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
const getDisable = async (req, res, next) => {
    try {
        const isRunning = await adminAttendance.findOne({ status: 'RUNNING' })
        if (!isRunning) {
            throw error('Not running', 400)
        }
        isRunning.status = "COMPLETED";
        await isRunning.save();
        return res.status(200).send(isRunning)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getEnable,
    getStatus,
    getDisable
}