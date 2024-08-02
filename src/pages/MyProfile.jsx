import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { router } from 'expo-router'

export default function MyProfile({ navigation }) {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user.user)
	console.log(user)

	const handleLogout = () => {
		dispatch(logout())
		router.push('/')
	}

	return (
		<View>
			{user ? (
				<>
					<Text>MyProfile</Text>
					<Text>Welcome {`${user.username}`}</Text>
					<Pressable onPress={handleLogout}>
						<Text>Logout</Text>
					</Pressable>
				</>
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
		</View>
	)
}
