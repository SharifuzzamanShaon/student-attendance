const { mongoose } = require("mongoose");

const adminAttendanceSchema = new mongoose.Schema({
    timelimit: {
        type: Number,
        required: true,
        min: 1,
        max: 30,
        default: 10
    },
    status: {
        type: String,
        enum: ['RUNNING', 'COMPLETED'],
        default: 'RUNNING'
    }
},
    { timestamps: true }
);

const adminAttendance = mongoose.model("adminAttendance", adminAttendanceSchema)

module.exports = adminAttendance