import { StatusBar } from 'expo-status-bar'
import { StyleSheet, ScrollView, View } from 'react-native'
import Main from './src/components/Main.jsx'
import Footer from './src/components/Footer.jsx'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from './src/components/SignIn.jsx'

export default function App() {
	const Stack = createNativeStackNavigator()

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Home'>
				<Stack.Screen name='Main' component={Main} options={{ headerShown: false }} />
				<Stack.Screen name='SignIn' component={SignIn} options={{ title: 'Sign In' }} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1
// 	},
// 	scrollContainer: {
// 		flexGrow: 1
// 	}
// })
