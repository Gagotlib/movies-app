import { StyleSheet, View } from 'react-native'
import MoviesList from '../components/MoviesList'
import React from 'react'
import SplashLoadingScreen from '../components/LoadingScreen'

export default function Main({ navigation }) {
	return (
		<View style={styles.container}>
			<MoviesList />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// flexDirection: 'column',
		marginTop: 10,
		marginBottom: 110
	}
})
