const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users')

router.route('/')
    .get(usersController.index)
    .post(usersController.newUser)

router.route('/:userId')
    .get(usersController.getUser)
    .put(usersController.putUser)
    .patch(usersController.patchUser)
    .delete(usersController.deleteUser)

router.route('/:userId/bugs')
    .get(usersController.getUserBug)
    .post(usersController.newUserBug)

//!!!TODO!!!
//for the user/bug delete route place that in the bugs route instead
module.exports = router
