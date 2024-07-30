import { Tabs } from 'expo-router'
import { View } from 'react-native-web'
import { Stack } from 'expo-router/stack'
import { FontAwesome } from '@expo/vector-icons'

export default function TabsLayout() {
	return (
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
      options = {{
        title: " My Profile",

        tabBarIcon: ({ color }) => <FontAwesome size={28} name='user' color={color} />,
        // href:null, // si no queremos que aparezca la tab
      }}
      />
		</Tabs>
	)
}

// ;<FontAwesome name='home' size={24} color='white' />
