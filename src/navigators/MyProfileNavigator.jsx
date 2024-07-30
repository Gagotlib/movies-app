import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../pages/SignIn'
import Register from '../pages/Register'
import MyProfile from '../pages/MyProfile'

export default function MyProfileNavigator({ navigation }) {
	const MyProfileStack = createNativeStackNavigator()

	return (
		<>
			<StatusBar style='auto' />
			<MyProfileStack.Navigator initialRouteName='MyProfile'>
				<MyProfileStack.Screen name='MyProfile' component={MyProfile} options={{headerShown: false}} />
				<MyProfileStack.Screen name='SignIn' component={SignIn} options={{ title: 'Sign In' }} />
				<MyProfileStack.Screen name='Register' component={Register} options={{ title: 'Register' }} />
			</MyProfileStack.Navigator>
		</>
	)
}
