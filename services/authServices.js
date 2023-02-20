const User = require("../model/User")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { findUserByProperty, addNewUser } = require('./user')
const error = require("../utils/error");


// Roles & accountStatus using by admin function 
async function registerService({ username, email, password, roles, accountStatus }) {

    const isEmailExists = await findUserByProperty('email', email)
    if (isEmailExists) throw error('User Exists', 400)
    const hash = await bcrypt.hash(password, saltRounds)
    return addNewUser({ username, email, password: hash, roles, accountStatus})
}

async function loginService({ email, password }) {

    const validUser = await findUserByProperty('email', email)
    if (!validUser) throw error('Invalid email', 400)

    const isValidPassword = await bcrypt.compare(password, validUser.password)
    if (!isValidPassword) throw error('Invaid Password', 400)
    const payload = {
        id: validUser._id,
        username: validUser.username,
        email: validUser.email
    }
    return jwt.sign(payload, 'secret-key', { expiresIn: "2h" })
}
module.exports = { registerService, loginService }