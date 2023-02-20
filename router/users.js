const router = require('express').Router()
const usersController = require('../controller/users')

router.get('/:userId', usersController.getUserById)

router.put('/:userId', usersController.putUserById)

router.patch('/:userId', usersController.patchUserById)

router.delete('/:userId', usersController.deleteUserById)


router.get('/', usersController.getUsers)

router.post('/', usersController.postUserById)

module.exports = router