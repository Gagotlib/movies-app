import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../pages/SignIn'
import Register from '../pages/Register'
import MyProfile from '../pages/MyProfile'
import LoadingScreen from '../components/LoadingScreen'

export default function MyProfileNavigator({ navigation }) {
	const MyProfileStack = createNativeStackNavigator()

	if (state.isLoading) {
		// We haven't finished checking for the token yet
		return <LoadingScreen />
	}

	return (
		<>
			<StatusBar style='auto' />
		 {state.userToken == null ?
		 (
			<MyProfileStack.Navigator initialRouteName='MyProfile'>
				<MyProfileStack.Screen name='MyProfile' component={MyProfile} options={{headerShown: false}} />
				<MyProfileStack.Screen name='SignIn' component={SignIn} options={{ title: 'Sign In' }} />
				<MyProfileStack.Screen name='Register' component={Register} options={{ title: 'Register' }} />
			</MyProfileStack.Navigator>

		 ):(
			<MyProfileStack.Navigator initialRouteName='MyProfile'>
				<MyProfileStack.Screen name='MyProfile' component={MyProfile} options={{headerShown: false}} />
				{/* <MyProfileStack.Screen name='SignIn' component={SignIn} options={{ title: 'Sign In' }} /> */}
				{/* <MyProfileStack.Screen name='Register' component={Register} options={{ title: 'Register' }} /> */}
			</MyProfileStack.Navigator>

		 )}
		</>
	)
}
