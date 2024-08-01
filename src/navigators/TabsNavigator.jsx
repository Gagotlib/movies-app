import {  Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import LoadingScreen from '../components/LoadingScreen'

export default function TabsNavigator() {
	//aca tengo que conseguir el usuario y pasarlo al resto de la app ?
  const user = true

	return (
		<>
			{user ? (
				<Tabs screenOptions={{ headerShown: false }}>
					<Tabs.Screen
						name='index'
						options={{
							title: 'Home',

							tabBarIcon: ({ color }) => <FontAwesome size={28} name='home' color={color} />
						}}
					/>
					<Tabs.Screen
						name='myProfile'
						options={{
							title: ' My Profile',

							tabBarIcon: ({ color }) => <FontAwesome size={28} name='user' color={color} />
							// href:null, // si no queremos que aparezca la tab
						}}
					/>
				</Tabs>
			) : (
				<LoadingScreen />
			)}
		</>
	)
}
