import { View, Text, Pressable, StyleSheet, FlatList, Image, ScrollView } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { router } from 'expo-router'
import { logout } from '../features/auth/redux/userSlice'

export default function MyProfile({ navigation }) {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user.user)
	console.log('en myprofile user', user)
	if (user && user.favMovies) {
		for (const favMovie of user.favMovies) {
			console.log('en MyProfile peliculas favoritas del estado user:', favMovie.title)
		}
	}

	const handleLogout = () => {
		dispatch(logout())
		router.push('/')
	}

	return (
		<ScrollView>
			{user ? (
				<View className='flex items-center justify-center gap-10 px-4 pt-8'>
					<Text>MyProfile</Text>
					{/* <Text>Welcome {`${user.username}`}</Text> */}
					<View className='flex flex-col items-center'>
						<Text>Favorite Movies:</Text>
						{user.favMovies.map((movie) => {
							return (
								<View key={movie._id} className='flex flex-col items-center'>
									<Image source={{ uri: movie.poster }} className='w-40 h-60' />
									<Text>{movie.title}</Text>
								</View>
							)
						})}
					</View>
					{/* <FlatList data={user.user.favMovies} renderItem={({ item: movie}) => <MovieCard movie={movie} />}></FlatList> */}
					<Pressable onPress={handleLogout}>
						<Text>Logout</Text>
					</Pressable>
				</View>
			) : (
				<View className='flex items-center justify-center gap-10 px-4 pt-8'>
					<Text className='text-3xl'>Welcome</Text>
					<Text className='text-2xl'>It appears you are not logged in</Text>
					<Text className='text-xl'>If you already have an account</Text>
					<Pressable onPress={() => navigation.navigate('SignIn')}>
						<Text className='px-8 py-2 font-bold text-white bg-blue-700 rounded-2xl text-md t-center tex'>Login</Text>
					</Pressable>
					<Text className='text-xl'>Don't have an account yet?</Text>
					<Pressable onPress={() => navigation.navigate('Register')}>
						<Text className='px-8 py-2 font-bold text-white bg-blue-700 rounded-2xl text-md t-center tex'>Register</Text>
					</Pressable>
				</View>
			)}
		</ScrollView>
	)
}
