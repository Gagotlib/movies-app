import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import movies from '../../movies.movies.json'
import MovieCard from './MovieCard'
import Footer from './Footer'

export default function MoviesList() {
	const sortedMovies = movies.sort((a, b) => a.title.localeCompare(b.title))

	const [searchTerm, setSearchTerm] = React.useState('')

	const filteredMovies = sortedMovies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || movie.director.toLowerCase().includes(searchTerm.toLowerCase()))

	return (
		<>
			<TextInput style={styles.input} placeholder='Search by Title or Director' value={searchTerm} onChangeText={setSearchTerm} />

			<FlatList data={filteredMovies} renderItem={({ item: movie }) => <MovieCard movie={movie} />}></FlatList>
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
	}
})
