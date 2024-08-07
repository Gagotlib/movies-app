import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// import movies from '../../movies.movies.json'
import MovieCard from './MovieCard'
import useMovies from '../hooks/useMovies'
import SortSelector from './SortSelector'

export default function MoviesList() {
	const { movies = [] } = useMovies(); // custom hook that fetches movies
	const [selectedValue, setSelectedValue] = useState(null)
	const [sortedMovies, setSortedMovies] = useState([])

	// sort movies
	useEffect(() => {
	 if (!Array.isArray(movies)) return
		let sortedArray = [...movies] // Crear una copia del array de movies

		if (selectedValue === 'Title') {
			sortedArray.sort((a, b) => a.title.localeCompare(b.title))
		} else if (selectedValue === 'Newest') {
			sortedArray.sort((a, b) => b.year - a.year)
		} else if (selectedValue === 'Latest') {
			sortedArray.sort((a, b) => a.year - b.year)
		}

		setSortedMovies(sortedArray)
	}, [selectedValue, movies]) // Asegúrate de incluir `movies` como dependencia

	const [searchTerm, setSearchTerm] = React.useState('')

	const filteredMovies = sortedMovies?.filter(
		(movie) =>
			movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
			movie.year === Number(searchTerm) ||
			movie.genre.some((genre) => genre.toLowerCase().includes(searchTerm.toLowerCase()))
	)

	return (
		<View>
			<SortSelector selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
			<TextInput style={styles.input} placeholder='Search by Title, Director, Year or Genre' value={searchTerm} onChangeText={setSearchTerm} />
			{movies && movies.length ? <FlatList data={filteredMovies} renderItem={({ item: movie }) => <MovieCard movie={movie} />}></FlatList> : <Text style={styles.text}> There are no movies </Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 10,
		borderWidth: 1,
		padding: 10,
		backgroundColor: 'white',
		borderRadius: 10,
		marginTop: 40
		// marginBottom: 90,
	},
	text: {
		textAlign: 'center',
		color: 'black',
		fontSize: 18
	}
})
