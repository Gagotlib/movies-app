import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

export default function StyledTextInput({ style = {}, ...props }) {
	const inputStyle = {
		...styles.textInput,
		...style
	}
	return <TextInput {...props} style={inputStyle} />
}

const styles = StyleSheet.create({
	textInput: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: 'blue',
		backgroundColor: 'white',
		color: 'black',
		fontSize: 16,
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginVertical: 10
	}
})
