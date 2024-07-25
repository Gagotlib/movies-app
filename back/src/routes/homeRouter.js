const { Router } = require('express')
const moviesRouter = require('./moviesRouter')
const usersRouter = require('./usersRouter')

// router principal
const homeRouter = Router()
// router para movies
homeRouter.use('/movies', moviesRouter)
homeRouter.use('/users', usersRouter)

module.exports = homeRouter
