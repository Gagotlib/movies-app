import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Stack } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import ImageViewer from 'react-native-image-zoom-viewer'

export default function Detail({}) {
	const { id } = useLocalSearchParams()
	const [movie, setMovie] = useState(undefined)
	// const user = user
	const [isFavorite, setIsFavorite] = useState(undefined)
	const [isVisible, setIsVisible] = useState(false)
	const images = [
		{
			url: movie?.poster
		}
	]
	const user = false

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
	}, [])

	const handleAddToFavorites = async ( movieId) => {
		if (!user) {
			console.log('No user found');
			return
		}
		
		console.log('Added to favorites');
		setIsFavorite(true)
		// try {
		// 	const response = await axios.put(`http://192.168.178.48:3000/users/favorite/${userId}`, movieId)
		// 	console.log(response.data)
		// } catch (error) {
		// 	console.log(error)
		// }
	}
	const handleRemoveFromFavorites = async (userId, movieId) => {
	console.log('Removed from favorites');
	setIsFavorite(false)
		// try {
		// 	const response = await axios.delete(`http://192.168.178.48:3000/users/favorite/${userId}`, movieId)
		// 	console.log(response.data)
		// } catch (error) {
		// 	console.log(error)
		// }
	}

	return (
		<ScrollView contentContainerStyle={{ paddingTop: 20 }}>
			<View className='flex items-center justify-center gap-3 px-4'>
				<Text className='mb-3 text-3xl'> {movie?.title}</Text>
				<View style={{ position: 'relative' }} className='flex '>
					<TouchableOpacity onPress={() => setIsVisible(true)}>
						<Image source={{ uri: movie?.poster }} style={{ width: 200, height: 400, borderRadius: 10 }} />
					</TouchableOpacity>
					{isFavorite ? (
						<View style={{ position: 'absolute', top: -20, right: -20, zIndex: 10 }} className='p-2 bg-white border-2 rounded-full'>
							<Pressable onPress={() => handleRemoveFromFavorites(1, movie?._id)}>
								<Ionicons name='heart-dislike-sharp' size={24} color='black' />
							</Pressable>
						</View>
					) : (
						<View style={{ position: 'absolute', top: -20, right: -20, zIndex: 10 }} className='p-2 bg-white border-2 rounded-full'>
							<Pressable onPress={() => handleAddToFavorites(1, movie?._id)}>
								<FontAwesome name='heart' size={24} color='pink' />
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
