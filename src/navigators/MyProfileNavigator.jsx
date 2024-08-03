import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../pages/SignIn'
import Register from '../pages/Register'
import MyProfile from '../pages/MyProfile'
import LoadingScreen from '../components/LoadingScreen'
import { useSelector } from 'react-redux'

export default function MyProfileNavigator({ navigation }) {
	const MyProfileStack = createNativeStackNavigator()

	const user = useSelector((state) => state.user.user)
	
	return (
		<>
			<StatusBar style='auto' />
		 {user == null ?
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
