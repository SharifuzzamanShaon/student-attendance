const { default: mongoose, Schema } = require("mongoose");

const studentAttenadanceSchema = new mongoose.Schema({

    User: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    adminAttendance: {
        type: Schema.Types.ObjectId,
        ref: "adminAttendance",
        required: true
    }
}, { timestamps: true })

const studentAttenadance = mongoose.model("studentAttenadance", studentAttenadanceSchema)

module.exports = studentAttenadance