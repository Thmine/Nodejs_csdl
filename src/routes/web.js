const express = require('express')
const router = express.Router()
const { getHomepage, getsign_in, postsign_in, gettable, getsign_up, postCreateUser, getUpdateUser,
    postUpdateUser, postDeleteUser, postHandleRemoveUser } = require('../controllers/homeController')

//router.Method('/route',handler)

router.get('/home', getHomepage)
router.get('/table', gettable)

router.get('/sign_in', getsign_in)
router.post('/sign_in', postsign_in)

router.get('/sign_up', getsign_up)
router.post('/create_user', postCreateUser)

router.post('/update_user', postUpdateUser)
router.get('/update/:id', getUpdateUser)

router.post('/delete_user/:id', postDeleteUser)
router.post('/delete_user', postHandleRemoveUser)
module.exports = router