import express from 'express'
import user from '../controllers/users.js'


const route = express.Router()

export default route
    .post('/login', user.loginUser)
    .post('/token', user.refreshToken)
    .post('/logout', user.logoutUser)
