const User = require('../models/User')
const Movie = require('../models/Movie')

class Users {
	constructor({ id, username, password, favMovies }) {
		if (!username || !password) {
			throw new Error('username and password are required')
		}

		this.id = id
		this.username = username
		this.password = password
		this.favMovies = favMovies
	}
}

const getAllUsersService = async () => {
	try {
		const users = await User.find()
		return users.map((user) => new Users(user))
	} catch (error) {
		throw new Error(error)
	}
}

const createUserService = async (user) => {
	try {
		const newUser = await User.create(user)
		return newUser
	} catch (error) {
		throw new Error(error)
	}
}

const getUserByIdService = async (id) => {
	try {
		const user = await User.findById(id).populate('favMovies')
		return new Users(user)
	} catch (error) {
		throw new Error(error)
	}
}

async function addFavoriteMovie(userId, movieId) {
	try {
		const movie = await Movie.findById(movieId)
		if (!movie) {
			throw new Error('Movie not found')
		}

		const user = await User.findById(userId)
		if (!user) {
			throw new Error('User not found')
		}

		if (!user.favMovies.includes(movieId)) {
			user.favMovies.push(movieId)
			await user.save()
		} else {
			throw new Error('Movie already added')
		}

		return user
	} catch (error) {
		throw new Error(error.message)
	}
}

async function removeFavoriteMovie(userId, movieId) {
	try {
		const movie = await Movie.findById(movieId)
		if (!movie) {
			throw new Error('Movie not found')
		}

		const user = await User.findById(userId)
		if (!user) {
			throw new Error('User not found')
		}

		const movieIndex = user.favMovies.indexOf(movieId)
		if (movieIndex === -1) {
			throw new Error('Movie not in favorites')
		}

		user.favMovies.splice(movieIndex, 1)
		await user.save()

		return user
	} catch (error) {
		throw new Error(error.message)
	}
}

module.exports = { getAllUsersService, createUserService, getUserByIdService, addFavoriteMovie, removeFavoriteMovie }
