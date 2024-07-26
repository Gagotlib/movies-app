import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import MoviesList from '../components/MoviesList'
import React from 'react'
import { Link } from 'expo-router'

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
		flexDirection: 'column',
		marginTop: 10
		// minHeight: '100%'
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: '#d7d7d7',
		// shadowColor: '#000',
		// shadowOffset: { width: 0, height: 5 },
		// shadowOpacity: 1,
		elevation: 3 // Para Android
	},
	h1: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'black'
	},
	button: {
		backgroundColor: 'blue',
		padding: 10,
		margin: 5,
		borderRadius: 10,
		width: '30%',
		textAlign: 'center'
	}
	// buttonText: {
	// 	color: 'white',
	// 	textAlign: 'center',
	// 	fontWeight: 'bold'
	// }
})
