const User = require('../models/User')
const Movie = require('../models/Movie')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.SECRET_KEY

class Users {
	constructor({ id, username, email, password, favMovies, role }) {
		if (!username || !password) {
			throw new Error('username and password are required')
		}

		this.id = id
		this.username = username
		this.email = email
		this.password = password
		this.favMovies = favMovies
		this.role = role
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
	const saltRounds = 10
	try {

    const userEmail = user.email.toLowerCase()

		const existingUser = await User.findOne({ email: userEmail })
		if (existingUser) {
			throw new Error('Email already in use')
		}

		const hashedPassword = await bcrypt.hash(user.password, saltRounds)
		const newUser = await User.create({
			username: user.username,
			password: hashedPassword,
			email: userEmail,
			role: user.role || 'user'
		})
		return newUser
	} catch (error) {
		throw new Error(error.message)
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

		return movie
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

async function loginUser(email, password) {
	try {
    const lowerEmail = email.toLowerCase()
		const user = await User.findOne({ email: lowerEmail }).populate('favMovies')
		if (!user) {
			throw new Error('User not found')
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			throw new Error('Invalid password')
		}

		const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' })

		return { user, token }
	} catch (error) {
		throw new Error(error.message)
	}
}

module.exports = { getAllUsersService, createUserService, getUserByIdService, addFavoriteMovie, removeFavoriteMovie, loginUser }
