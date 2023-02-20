const jwt = require('jsonwebtoken')
const User = require('../model/User')
const authenticate = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token) return res.status(400).send({ message: 'unauthorized' })
        token = token.split(' ')[1]
        const decode = jwt.verify(token, 'secret-key')
        console.log(decode);
        const vaidUser = await User.findById(decode.id)
        if (!vaidUser) return res.status(400).send({ message: 'unauthorized user' })
        req.user = vaidUser //Here req, res is a mutable boject
        next();
    } catch (error) {
        return res.status(400).send({ message: "Invalid token" })
    }
}
module.exports = authenticate