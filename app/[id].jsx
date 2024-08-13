import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Stack, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import ImageViewer from 'react-native-image-zoom-viewer'
import { useDispatch, useSelector } from 'react-redux'
import { addUserFavMovie, removeUserFavMovie } from '../src/features/auth/redux/userSlice'
import { useNavigation } from '@react-navigation/native'

export default function Detail({}) {
	const navigation = useNavigation()
	const { id } = useLocalSearchParams()
	const [movie, setMovie] = useState(undefined)
	const [isFavorite, setIsFavorite] = useState(undefined)
	const [isVisible, setIsVisible] = useState(false)
	const images = [
		{
			url: movie?.poster
		}
	]
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user.user)
	if (user && user.favMovies) {
		for (const favMovie of user.favMovies) {
			console.log('en Detail peliculas favoritas del estado user:', favMovie.title)
		}
	}
	// console.log("user.favMovies",user.favMovies);
	useEffect(() => {
		async function getMovie() {
			try {
				const response = await axios.get(`http://192.168.178.48:3000/movies/${id}`)
				setMovie(response.data)
			} catch (error) {
				console.log(error)
			}
		}
		getMovie(id)
	}, [id])

	useEffect(() => {
		if (user && user.favMovies) {
			const favorite = user.favMovies.some((movie) => movie._id === id)
			setIsFavorite(favorite)
			console.log('isFavorite:', favorite)
		}
	}, [user, id])

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTitle: movie?.title || 'Movie Detail'
		})
	}, [navigation, movie])

	const handleAddToFavorites = async (movieId) => {
		if (!user) {
			console.log('No user found')
			Alert.alert('You must be logged in to add a Favorite')
			return
		}
		console.log('user ID:', user._id, 'movieId:', movieId)
		const body = { movieId: movieId }

		try {
			const response = await axios.put(`http://192.168.178.48:3000/users/favorite/${user._id}`, body)
			console.log(response.data)
			dispatch(addUserFavMovie(response.data))
			setIsFavorite(true)
			console.log('Added to favorites')
			Alert.alert('Added to favorites')
		} catch (error) {
			console.log(error.response.data)
		}
	}
	const handleRemoveFromFavorites = async (movieId) => {
		if (!user) {
			console.log('No user found')
			Alert.alert('You must be logged in to add a Favorite')
			return
		}
		const body = { movieId: movieId }
		console.log(user._id, movieId)
		try {
			const response = await axios.delete(`http://192.168.178.48:3000/users/favorite/${user._id}`, {
				data: { movieId: movieId }
			})
			// console.log(response.data)
			dispatch(removeUserFavMovie(movieId))
			setIsFavorite(false)
			console.log('Removed from favorites')
			Alert.alert('Removed from favorites')
		} catch (error) {
			console.log(error.response.data)
		}
	}

	return (
		<ScrollView contentContainerStyle={{ paddingTop: 20 }}>
			<View className='flex items-center justify-center gap-3 px-4'>
				{/* <Text className='mb-3 text-3xl'> {movie?.title}</Text> */}
				<View style={{ position: 'relative' }} className='flex '>
					<TouchableOpacity onPress={() => setIsVisible(true)}>
						<Image source={{ uri: movie?.poster }} style={{ width: 200, height: 400, borderRadius: 10 }} />
					</TouchableOpacity>
					{isFavorite ? (
						<View style={{ position: 'absolute', top: -20, right: -20, zIndex: 10 }} className='p-2 bg-white border-2 rounded-full'>
							<Pressable onPress={() => handleRemoveFromFavorites(movie?._id)}>
								<FontAwesome name='heart' size={24} color='pink' />
							</Pressable>
						</View>
					) : (
						<View style={{ position: 'absolute', top: -20, right: -20, zIndex: 10 }} className='p-2 bg-white border-2 rounded-full'>
							<Pressable onPress={() => handleAddToFavorites(movie?._id)}>
								<Ionicons name='heart-dislike-sharp' size={24} color='black' />
							</Pressable>
						</View>
					)}
				</View>
				<Text>Year: {movie?.year}</Text>
				<Text>Director: {movie?.director}</Text>
				<Text>Duration: {movie?.duration}</Text>
				<Text>Genre: {movie?.genre.join(', ')}</Text>
				<Text>Rate: {movie?.rate}</Text>
				<Text className='text-center'>Description: {movie?.description}</Text>
				<Modal visible={isVisible} transparent={true} onRequestClose={() => setIsVisible(false)}>
					<ImageViewer imageUrls={images} enableSwipeDown={true} onSwipeDown={() => setIsVisible(false)} />
				</Modal>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({})

// Detail.layoutOptions = {
// 	headerShown: true, // Muestra el header
// 	headerTitle: 'Movie Details' // Puedes personalizar el título aquí
// }
