import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useMovies = () => {
	const [movies, setMovies] = useState(null)

	const getMovies = async () => {
		try {
			const response = await axios.get('http://192.168.178.48:3000/movies/')
			// console.log(response.data)
			setMovies(response.data)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getMovies()
	}, [])

	return { movies: movies }
}
export default useMovies
