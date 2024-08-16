import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import useMovies from '../hooks/useMovies'
import MovieCard from '../components/MovieCard'
import { useEffect, useState } from 'react'
import SortSelector from '../components/SortSelector'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function Catalog() {
	const { movies = [] } = useMovies() // Custom hook that fetches movies

	const [searchTerm, setSearchTerm] = useState('')
	const [sortedMovies, setSortedMovies] = useState([])
	const [selectedValue, setSelectedValue] = useState(null)
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const [isGenreOpen, setIsGenreOpen] = useState(false)
	const [selectedGenres, setSelectedGenres] = useState([])
	const [isDirectorOpen, setIsDirectorOpen] = useState(false)
	const [isYearOpen, setIsYearOpen] = useState(false)
	const [selectedDirectors, setSelectedDirectors] = useState([]) // Array for multiple director selection
	const [selectedYears, setSelectedYears] = useState([]) // Array for multiple year selection
	const [isSortingOpen, setIsSortingOpen] = useState(false)

	useEffect(() => {
		if (!Array.isArray(movies)) return
		let sortedArray = [...movies]

		if (selectedValue === 'Title') {
			sortedArray.sort((a, b) => a.title.localeCompare(b.title))
		} else if (selectedValue === 'Newest') {
			sortedArray.sort((a, b) => b.year - a.year)
		} else if (selectedValue === 'Oldest') {
			sortedArray.sort((a, b) => a.year - b.year)
		}

		setSortedMovies(sortedArray)
	}, [selectedValue, movies])

	const toggleSelection = (item, selectedArray, setSelectedArray) => {
		if (selectedArray.includes(item)) {
			setSelectedArray(selectedArray.filter((i) => i !== item))
		} else {
			setSelectedArray([...selectedArray, item])
		}
	}

	const filteredMovies = sortedMovies?.filter((movie) => {
		const matchesSearchTerm = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || movie.director.toLowerCase().includes(searchTerm.toLowerCase()) || movie.year === Number(searchTerm)
		const matchesGenres = selectedGenres.length === 0 || selectedGenres.every((selectedGenre) => movie.genre.map((g) => g.toLowerCase()).includes(selectedGenre))
		const matchesDirectors = selectedDirectors.length === 0 || selectedDirectors.includes(movie.director.toLowerCase())

		const matchesYears = selectedYears.length === 0 || selectedYears.includes(movie.year)

		return matchesSearchTerm && matchesGenres && matchesDirectors && matchesYears
	})

	const movieGenres = [...new Set(movies?.flatMap((movie) => movie.genre))]
	const movieYears = [...new Set(movies?.map((movie) => movie.year))]
	const movieDirectors = [...new Set(movies?.map((movie) => movie.director))]

	return (
		<View className='px-0 mt-10'>
			<View className='flex'>
				<View className='flex flex-row px-2 '>
					<Pressable
						onPress={() => {
							setIsFilterOpen(!isFilterOpen)
							setIsGenreOpen(false)
							setIsDirectorOpen(false)
							setIsYearOpen(false)
							setIsSortingOpen(false)
						}}
						className='items-center w-1/2 justify-center  rounded-lg h-10 '
					>
						<Text className='font-bold '>
							 <FontAwesome name='filter' size={24} color='black' />
						</Text>
					</Pressable>
					<SortSelector
						selectedValue={selectedValue}
						setSelectedValue={setSelectedValue}
						setIsFilterOpen={setIsFilterOpen}
						isSortingOpen={isSortingOpen}
						setIsSortingOpen={setIsSortingOpen}
						setIsDirectorOpen={setIsDirectorOpen}
						setIsGenreOpen={setIsGenreOpen}
						setIsYearOpen={setIsYearOpen}
					/>
				</View>

				<View className='my-1 '>
					{isFilterOpen && (
						<View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
							<Pressable
								onPress={() => {
									setSearchTerm('')
									setSelectedGenres([])
									setSelectedDirectors([])
									setSelectedYears([])
								}}
								className='items-center w-1/2 px-4 py-2 mb-2 border-2 border-red-500 rounded-lg'
							>
								<Text className='text-red-500'>Clear Filters</Text>
							</Pressable>
							<Pressable
								className='items-center w-1/2 px-4 py-2 mb-2 border-2 border-blue-500 rounded-lg'
								onPress={() => {
									setIsGenreOpen(!isGenreOpen)
									setIsDirectorOpen(false)
									setIsYearOpen(false)
								}}
							>
								<Text>Filter by Genre</Text>
							</Pressable>
							<Pressable
								className='items-center w-1/2 px-4 py-2 mb-2 border-2 border-blue-500 rounded-lg'
								onPress={() => {
									setIsDirectorOpen(!isDirectorOpen)
									setIsGenreOpen(false)
									setIsYearOpen(false)
								}}
							>
								<Text>Filter by Director</Text>
							</Pressable>
							<Pressable
								className='items-center w-1/2 px-4 py-2 mb-2 border-2 border-blue-500 rounded-lg'
								onPress={() => {
									setIsYearOpen(!isYearOpen)
									setIsGenreOpen(false)
									setIsDirectorOpen(false)
								}}
							>
								<Text>Filter by Year</Text>
							</Pressable>
						</View>
					)}

					{isGenreOpen && (
						<FlatList
							data={movieGenres}
							renderItem={({ item: genre }) => (
								<Pressable
									className={`flex items-center justify-center w-1/3 px-4 py-2 m-2 my-2 border-2 rounded-lg ${
										selectedGenres.includes(genre.toLowerCase()) ? 'border-green-500 bg-green-100' : 'border-blue-500'
									}`}
									onPress={() => toggleSelection(genre.toLowerCase(), selectedGenres, setSelectedGenres)}
								>
									<Text>{genre}</Text>
								</Pressable>
							)}
							keyExtractor={(item) => item}
							numColumns={2}
							columnWrapperStyle={{ justifyContent: 'space-between' }}
						/>
					)}

					{isDirectorOpen && (
						<FlatList
							data={movieDirectors}
							renderItem={({ item: director }) => (
								<Pressable
									className={`flex items-center justify-center w-5/12 px-4 py-2  my-2 border-2 rounded-lg ${
										selectedDirectors.includes(director.toLowerCase()) ? 'border-green-500 bg-green-100' : 'border-blue-500'
									}`}
									onPress={() => toggleSelection(director.toLowerCase(), selectedDirectors, setSelectedDirectors)}
								>
									<Text>{director}</Text>
								</Pressable>
							)}
							keyExtractor={(item) => item}
							numColumns={2}
							columnWrapperStyle={{ justifyContent: 'space-around' }}
						/>
					)}

					{isYearOpen && (
						<FlatList
							data={movieYears}
							renderItem={({ item: year }) => (
								<Pressable
									className={`flex items-center justify-center w-1/3 px-4 py-2 m-2 my-2 border-2 rounded-lg ${selectedYears.includes(year) ? 'border-green-500 bg-green-100' : 'border-blue-500'}`}
									onPress={() => toggleSelection(year, selectedYears, setSelectedYears)}
								>
									<Text>{year}</Text>
								</Pressable>
							)}
							keyExtractor={(item) => item.toString()}
							numColumns={2}
							columnWrapperStyle={{ justifyContent: 'space-between' }}
						/>
					)}
				</View>
			</View>
			<View className='pb-24'>
				{filteredMovies.length > 0 ? (
					<FlatList data={filteredMovies} renderItem={({ item: movie }) => <MovieCard movie={movie} />} />
				) : (
					<Text style={styles.text}>There are no movies matching your search</Text>
				)}
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
