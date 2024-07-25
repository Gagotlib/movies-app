const { getAllUsersService, createUserService, addFavoriteMovie, getUserByIdService, removeFavoriteMovie, loginUser } = require('../services/usersServices')



const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsersService()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({
      message: `error loading users: ${error}`
    })
  }
}

const getUserByIdController = async (req, res) => {
  try {
    const { userId } = req.params
    const foundUser = await getUserByIdService(userId)
    res.status(200).json(foundUser)
  } catch (error) {
    res.status(500).json({
      message: `error loading user: ${error}`})
    }
  }
const createUserController = async (req, res) => {
  try {
    const user = req.body
    const newUser = await createUserService(user)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({
      message: `Error creating user. ${error}`
    })
  }
}

const addFavoriteMovieController = async (req, res) => {
  const { userId } = req.params
  const { movieId } = req.body
  try {
    const updatedUser = await addFavoriteMovie(userId, movieId)
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(400).json({
      message: `error adding favorite movie: ${error}`
    })
  }
}

const removeFavoriteMovieController = async (req, res) => {
  const { userId } = req.params
  const { movieId } = req.body
  try {
    const updatedUser = await removeFavoriteMovie(userId, movieId)
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(400).json({
      message: `error removing favorite movie: ${error}`
    })
  }
}

async function loginController(req, res) {
	const { email, password } = req.body

	try {
		const { user, token } = await loginUser(email, password)
		res.status(200).json({ user, token })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = { getAllUsersController, createUserController, addFavoriteMovieController, getUserByIdController, removeFavoriteMovieController, loginController }
