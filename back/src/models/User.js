const mongoose = require('mongoose')
const Movie = require('./Movie')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	favMovies: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Movie'
		}
	]
})

const User = mongoose.model('User', userSchema)

module.exports = User
