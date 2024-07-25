import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// import movies from '../../movies.movies.json'
import MovieCard from './MovieCard'
import Footer from './Footer'

import useMovies from '../hooks/useMovies'

export default function MoviesList() {
	
	const { movies } = useMovies() // custom hook

	const sortedMovies = movies?.sort((a, b) => a.title.localeCompare(b.title))

	const [searchTerm, setSearchTerm] = React.useState('')

	const filteredMovies = sortedMovies?.filter(
		(movie) =>
			movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
			movie.year === Number(searchTerm) ||
			movie.genre.some((genre) => genre.toLowerCase().includes(searchTerm.toLowerCase()))
	)

	return (
		<>
			<TextInput style={styles.input} placeholder='Search by Title, Director, Year or Genre' value={searchTerm} onChangeText={setSearchTerm} />

			{movies && movies.length ? <FlatList data={filteredMovies} renderItem={({ item: movie }) => <MovieCard movie={movie} />}></FlatList> : <Text style={styles.text}> There are no movies </Text>}
			{/* <Footer /> */}
		</>
	)
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		backgroundColor: 'white',
		borderRadius: 10
	},
	text: {
		textAlign: 'center',
		color: 'black',
		fontSize: 18
	}
})
