import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Stack } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'

export default function Detail({}) {
	const { id } = useLocalSearchParams()
	const [movie, setMovie] = useState(undefined)

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

	return (
		<ScrollView contentContainerStyle={{ paddingTop: 20 }}>
      <Stack.Screen
      // options={

      // }
      />
			{/* <Link asChild href='/' className='flex text-center bg-blue-700 py-2 px-4 rounded-lg text-white font-bold absolute top-10 left-5'>
				<Pressable>
					<FontAwesome name='home' size={24} color='white' />
				</Pressable>
			</Link> */}
			<View className='flex justify-center items-center gap-3 px-4 '>
				<Text className='text-3xl mb-5'> {movie?.title}</Text>

				<Image src={movie?.poster} className='w-[300px] h-[500px] ' />
				<Text>Year: {movie?.year}</Text>
				<Text>Director: {movie?.director}</Text>
				<Text>Duration: {movie?.duration}</Text>
				<Text>Genre: {movie?.genre.join(', ')}</Text>
				<Text>Rate: {movie?.rate}</Text>
				<Text className='text-center'>Description: {movie?.description}</Text>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({})
