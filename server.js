const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express()
const bodyParser = require('body-parser');
const authenticate = require("./middleware/auth");
const routes = require("./router");
const User = require("./model/User");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/userDB');
        console.log("DB Connected");
    } catch (error) {
        console.log(error.message);
    }
}
//Private router
app.get("/private", authenticate, async (req, res) => {
    const validUser = req.userss
    return res.status(200).send({ message: "Welcome to private router", validUser })
})

app.get("/getSingle/:userId", async(req, res, next) => {
    try {
        const { userId } = req.params
        const user =await User.findById( userId );
        return res.status(200).send(user)
    } catch (error) {
        next(error)
    }

})
// Router Registration

app.use(routes)


app.use((error, req, res, text) => {
    const message = error.message ? error.message : "Server Error Occured"
    const status = error.status ? error.status : 500
    res.status(status).send(message)
})

app.listen(5020, async () => {
    console.log("server running at http://localhost:5020");
    await connectDB()
})