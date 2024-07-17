import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import MoviesList from '../components/MoviesList'
import React from 'react'


export default function Main({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.h1}>Movies App</Text>
				<Pressable onPress={() => navigation.navigate('SignIn')} style={styles.button}>
					<Text style={styles.buttonText}>Sign In</Text>
				</Pressable>
			</View>
			<MoviesList />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 30
		// minHeight: '100%'
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 7,
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
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold'
	}
})
