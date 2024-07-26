const { Router } = require('express')
const { getAllMoviesController, postMovieController, getMovieByIdController } = require('../controllers/moviesController')
const dataValidation = require('../middlewares/dataValidation')

// router para movies
const moviesRouter = Router()
moviesRouter.get('/', getAllMoviesController)
moviesRouter.get('/:id', getMovieByIdController)

// ruta post con validacion por middleware
moviesRouter.post('/', dataValidation, postMovieController)
module.exports = moviesRouter
