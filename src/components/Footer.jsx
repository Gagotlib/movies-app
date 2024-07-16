import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Footer() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>App hecha por Gabriel Gotlib</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		marginTop: 0,
    width: '100%',
	},
	text: {
		color: 'white',
		fontSize: 16,
    textAlign: "center",
	}
})
