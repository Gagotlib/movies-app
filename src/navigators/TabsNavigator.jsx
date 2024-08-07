import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'


export default function TabsNavigator() {

	return (

			<Tabs screenOptions={{ headerShown: false }}>
				<Tabs.Screen
					name='index'
					options={{
						title: 'Home',
						// headerShown: true,
						tabBarIcon: ({ color }) => <FontAwesome size={28} name='home' color={color} />
					}}
					/>
				<Tabs.Screen
					name='myProfile'
					options={{
						title: ' My Profile',
						// headerShown: true,
						headerTitle: 'My Profile',
						tabBarIcon: ({ color }) => <FontAwesome size={28} name='user' color={color} />
						// href:null, // si no queremos que aparezca la tab
					}}
				/>
			</Tabs>

	)
}
