import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function StyledButton({ style = {}, children, ...props }) {
	const inputStyle = {
		...styles.button,
		...style
	}
	return (
		<Pressable {...props} style={inputStyle}>
			<Text style={styles.buttonText}>{children}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'blue',
		padding: 10,
		margin: 5,
		borderRadius: 20,
		width: '40%',
		textAlign: 'center'
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
		
	}
})
