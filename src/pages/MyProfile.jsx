import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import React  from 'react'
import {  useSelector } from 'react-redux'
import { Link, router } from 'expo-router'


export default function MyProfile({ navigation }) {

	const user = useSelector((state) => state.user.user)
	console.log('en myprofile user', user)
	if (user && user.favMovies) {
		for (const favMovie of user.favMovies) {
			console.log('en MyProfile peliculas favoritas del estado user:', favMovie.title, favMovie._id)
		}
	}


	return (
		<ScrollView>
			{user ? (
				<View className='flex justify-center gap-8 px-4 pt-8'>
					{/* <Text className='text-3xl text-center'>My Profile</Text> */}
					{/* <Text>Welcome {`${user.username}`}</Text> */}
					<View className='flex flex-col gap-4'>
						<Text className='text-xl'>Favorite Movies:</Text>
						{user.favMovies.map((movie) => {
							return (
								<Link href={`/${movie._id}`} asChild key={movie.id}>
									<Pressable>
										<View className='flex flex-col items-center'>
											<Image source={{ uri: movie.poster }} className='w-40 h-60' />
											{/* <Text>{movie.title}</Text> */}
										</View>
									</Pressable>
								</Link>
							)
						})}
					</View>

					{/* <Pressable onPress={handleLogout} className='flex w-4/5 mb-10'>
						<Text className='py-3 font-bold text-center text-white bg-blue-700 rounded-2xl text-md '>Logout</Text>
					</Pressable> */}
				</View>
			) : (
				<View className='flex items-center justify-center gap-10 px-4 pt-8 mt-10'>
					<Text className='text-3xl'>Welcome</Text>
					<Text className='text-2xl'>First time here?</Text>
					<Text className='text-xl'>If you don't have an account</Text>
					<Pressable onPress={() => navigation.navigate('Register')} className='flex w-4/5 '>
						<Text className='py-3 font-bold text-center text-white bg-blue-700 rounded-2xl text-md'>Register</Text>
					</Pressable>
					<Text className='text-xl '>Already have an account?</Text>
					<Pressable onPress={() => navigation.navigate('SignIn')} className='flex w-4/5 '>
						<Text className='py-3 font-bold text-center text-white bg-blue-700 rounded-2xl text-md'>Login</Text>
					</Pressable>
				</View>
			)}
		</ScrollView>
	)
}
