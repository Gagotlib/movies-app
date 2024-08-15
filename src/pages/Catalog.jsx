import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import useMovies from '../hooks/useMovies'
import MovieCard from '../components/MovieCard'
import { useEffect, useState } from 'react'
import SortSelector from '../components/SortSelector'

export default function Catalog() {
	const { movies = [] } = useMovies() // Custom hook that fetches movies

	const [searchTerm, setSearchTerm] = useState('')
	const [sortedMovies, setSortedMovies] = useState([])
	const [selectedValue, setSelectedValue] = useState(null)
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const [isGenreOpen, setIsGenreOpen] = useState(false)
	const [selectedGenres, setSelectedGenres] = useState([]) // Array for multiple genre selection

	useEffect(() => {
		if (!Array.isArray(movies)) return
		let sortedArray = [...movies]

		if (selectedValue === 'Title') {
			sortedArray.sort((a, b) => a.title.localeCompare(b.title))
		} else if (selectedValue === 'Newest') {
			sortedArray.sort((a, b) => b.year - a.year)
		} else if (selectedValue === 'Latest') {
			sortedArray.sort((a, b) => a.year - b.year)
		}

		setSortedMovies(sortedArray)
	}, [selectedValue, movies])

	const toggleGenreSelection = (genre) => {
		if (selectedGenres.includes(genre)) {
			setSelectedGenres(selectedGenres.filter((g) => g !== genre))
		} else {
			setSelectedGenres([...selectedGenres, genre])
		}
	}

	const filteredMovies = sortedMovies?.filter((movie) => {
		const matchesSearchTerm = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || movie.director.toLowerCase().includes(searchTerm.toLowerCase()) || movie.year === Number(searchTerm)

		const matchesGenres = selectedGenres.length === 0 || selectedGenres.every((selectedGenre) => movie.genre.map((g) => g.toLowerCase()).includes(selectedGenre))

		return matchesSearchTerm && matchesGenres
	})

	const genres = ['Action', 'Biography', 'Sci-Fi', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Crime', 'Mystery', 'Thriller', 'Western', 'Romance']

	return (
		<View className='px-2 mt-14'>
			<View className='flex'>
				<View className='flex flex-row '>
					<Pressable
						onPress={() => {
							setIsFilterOpen(!isFilterOpen)
							setIsGenreOpen(false)
						}}
						className='items-center w-1/2 px-4 py-2 border-2 border-blue-500 rounded-lg '
					>
						<Text className=''>Filters..</Text>
					</Pressable>
					<SortSelector selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
				</View>

				<View className='my-4 '>
					{isFilterOpen && (
						<View>
							<Pressable
								onPress={() => {
									setSearchTerm('')
									setSelectedGenres([])
								}}
								className='items-center w-1/2 px-4 py-2 mb-2 border-2 border-red-500 rounded-lg'
							>
								<Text className='text-red-500'>Clear Filters</Text>
							</Pressable>
							<Pressable
								className='items-center w-1/2 px-4 py-2 mb-2 border-2 border-blue-500 rounded-lg'
								onPress={() => {
									setIsGenreOpen(!isGenreOpen)
								}}
							>
								<Text>Filter by genre</Text>
							</Pressable>
						</View>
					)}

					{isGenreOpen && (
						<FlatList
							data={genres}
							renderItem={({ item: genre }) => (
								<Pressable
									className={`flex items-center justify-center w-1/3 px-4 py-2 m-2 my-2 border-2 rounded-lg ${
										selectedGenres.includes(genre.toLowerCase()) ? 'border-green-500 bg-green-100' : 'border-blue-500'
									}`}
									onPress={() => toggleGenreSelection(genre.toLowerCase())}
								>
									<Text>{genre}</Text>
								</Pressable>
							)}
							keyExtractor={(item) => item}
							numColumns={2}
							columnWrapperStyle={{ justifyContent: 'space-between' }}
						/>
					)}
				</View>
			</View>
			<View className='mb-40'>
				{filteredMovies.length > 0 ? <FlatList data={filteredMovies} renderItem={({ item: movie }) => <MovieCard movie={movie} />} /> : <Text style={styles.text}>There are no movies</Text>}
			</View>
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
	},
	text: {
		textAlign: 'center',
		color: 'black',
		fontSize: 18
	}
})
