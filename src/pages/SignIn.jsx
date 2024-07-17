import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Form, Formik } from 'formik'
import StyledTextInput from '../components/StyledTextInput'
import StyledButton from '../components/StyledButton'

export default function SignIn({ navigation }) {
	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Sing in</Text>
			<Formik initialValues={{ email: '', password: '' }} onSubmit={(values) => console.log(values)}>
				{({ handleSubmit, values, errors, handleChange }) => (
					<View>
						<StyledTextInput placeholder='Email' value={values.email} onChangeText={handleChange('email')} />
						<StyledTextInput placeholder='Password' secureTextEntry={true} value={values.password} onChangeText={handleChange('password')} />
						
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

						<StyledButton onPress={handleSubmit} style={{ backgroundColor: 'green' }}>
							Sing In
						</StyledButton>
						<StyledButton onPress={() => navigation.navigate('Main')}>Back Home</StyledButton>
						</View>
					</View>
				)}
			</Formik>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20
		// justifyContent: 'center',
		// alignItems: 'center'
	},
	h1: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'black'
	},
	// input: {
	// 	height: 40,
	// 	margin: 12,
	// 	borderWidth: 1,
	// 	padding: 10,
	// 	backgroundColor: 'white',
	// 	borderRadius: 10
	// }
})
