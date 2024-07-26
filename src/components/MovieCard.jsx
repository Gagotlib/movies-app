import { Link } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, Modal, TouchableOpacity, Pressable } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

export default function MovieCard({ movie }) {
	const [isVisible, setIsVisible] = useState(false)
	const images = [
		{
			url: movie.poster
		}
	]

	// useEffect(() => {
	// 	console.log(movie.id)
	// }, [])

	return (
		<Link href={`/${movie.id}`} style={styles.cardContainer} asChild key={movie.id}>
			<Pressable>
				<View className='flex flex-col items-center'>
					<Text style={styles.movieTitle}>{movie.title}</Text>
					<TouchableOpacity onPress={() => setIsVisible(true)}>
						<Image style={styles.poster} source={{ uri: movie.poster }} />
					</TouchableOpacity>
					<Text>Year: {movie.year}</Text>
					<Text>Director: {movie.director}</Text>
					<Text>Duration: {movie.duration}</Text>
					<Text>Genre: {movie.genre.join(', ')}</Text>
					<Text>Rate: {movie.rate}</Text>
					<Text style={{ textAlign: 'center' }}>Description: {movie.description}</Text>

					<Modal visible={isVisible} transparent={true} onRequestClose={() => setIsVisible(false)}>
						<ImageViewer imageUrls={images} enableSwipeDown={true} onSwipeDown={() => setIsVisible(false)} />
					</Modal>
				</View>
			</Pressable>
		</Link>
	)
}

const styles = StyleSheet.create({
	cardContainer: {
		padding: 20,
		backgroundColor: 'white',
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 10,
		margin: 10,
		elevation: 5,
		gap: 5,
		alignItems: 'center'
	},
	movieTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 10
	},
	poster: {
		width: 300,
		height: 450,
		borderRadius: 10,
		resizeMode: 'contain'
	}
})
