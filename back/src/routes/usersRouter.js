const { Router } = require('express')
const { getAllUsersController, createUserController, addFavoriteMovieController, getUserByIdController, removeFavoriteMovieController, loginController } = require('../controllers/usersController')

const usersRouter = Router()

usersRouter.get('/', getAllUsersController)
usersRouter.get('/:userId', getUserByIdController)
usersRouter.post('/', createUserController)
usersRouter.put('/favorite/:userId', addFavoriteMovieController)
usersRouter.delete('/favorite/:userId', removeFavoriteMovieController)
usersRouter.post('/login', loginController)
module.exports = usersRouter
