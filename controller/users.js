const User = require('../model/User')
const userService = require('../services/user')
const error = require('../utils/error')
const authService = require('../services/authServices')
const getUsers = async (req, res, next) => {
    try {
        const allUser = await userService.getUsers()
        return res.status(200).send(allUser)
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    const { userId } = req.params
    console.log(userId);
    try {
        const user = await userService.findUserByProperty('_id', userId)
        console.log(user);
        if (!user) {
            throw error('user not found', 404)
        }
        return res.status(200).send(user)
    } catch (error) {
        next(error)
    }
}

const postUserById = async (req, res, next) => {
    try {
        const { username, email, password, roles, accountStatus } = req.body
        const newUser = await authService.registerService({ username, email, password, roles, accountStatus })
        if (!newUser) {
            throw error('User not created', 400)
        }
        return res.status(201).send({ message: 'new user created', newUser })
    } catch (error) {
        next(error)
    }
}

const putUserById = async (req, res, next) => {
    try {
        const { userId } = req.params
        const { username, email, roles, accountStatus } = req.body

        const updateUser = await userService.putUserById(userId, { username, email, roles, accountStatus })
        if (!updateUser) throw error('user not found', 404)
        return res.status(200).send({ message: "user updated", updateUser })
    } catch (error) {
        next(error)
    }
}

const patchUserById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { username, roles, accountStatus } = req.body;
        const user = await userService.findUserByProperty('_id', userId);
        if (!user) throw error('user not found', 404);

        user.username = username ?? user.username;
        user.roles = roles ?? user.roles;
        user.accountStatus = accountStatus ?? user.accountStatus;

        await user.save()
        return res.status(200).send({ message: 'User Updated', user })
    } catch (error) {
        next(error)
    }
}

const deleteUserById = async (req, res, next) => {
    try {
        const { userId } = req.params

        const getUser = await userService.findUserByProperty('_id', userId)
        if (!getUser) throw error('user not found', 404)

        const userDeleted = await userService.deleteUser('_id', userId)
        if (!userDeleted) throw error('user not deleted', 400)

        return res.status(200).send({ message: 'user deleted' })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getUsers,
    getUserById,
    putUserById,
    patchUserById,
    deleteUserById,
    postUserById
}