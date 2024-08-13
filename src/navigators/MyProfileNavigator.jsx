import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../pages/SignIn'
import Register from '../pages/Register'
import MyProfile from '../pages/MyProfile'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Pressable, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { logout } from '../features/auth/redux/userSlice'
import { router } from 'expo-router'

export default function MyProfileNavigator({ navigation }) {
	const MyProfileStack = createNativeStackNavigator()
	const user = useSelector((state) => state.user.user)
	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(logout())
		Alert.alert('Logout successful')
		router.push('/')
	}

	return (
		<>
			<StatusBar style='auto' />
			{user == null ? (
				<MyProfileStack.Navigator initialRouteName='MyProfile'>
					<MyProfileStack.Screen name='MyProfile' component={MyProfile} options={{ headerShown: false }} />
					<MyProfileStack.Screen name='SignIn' component={SignIn} options={{ title: 'Sign In' }} />
					<MyProfileStack.Screen name='Register' component={Register} options={{ title: 'Register' }} />
				</MyProfileStack.Navigator>
			) : (
				<MyProfileStack.Navigator initialRouteName='MyProfile'>
					<MyProfileStack.Screen
						name='MyProfile'
						component={MyProfile}
						options={{
							headerShown: true,
							headerRight: () => (
								<Pressable onPress={handleLogout} className='flex '>
									<FontAwesome size={28} name='sign-out' color='black' />
								</Pressable>
							)
						}}
					/>
					{/* <MyProfileStack.Screen name='SignIn' component={SignIn} options={{ title: 'Sign In' }} /> */}
					{/* <MyProfileStack.Screen name='Register' component={Register} options={{ title: 'Register' }} /> */}
				</MyProfileStack.Navigator>
			)}
		</>
	)
}
