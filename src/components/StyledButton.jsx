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
		paddingVertical: 15,
		margin: 5,
		borderRadius: 10,
		width: '85%',
		textAlign: 'center'
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
		
	}
})
