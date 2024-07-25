import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Form, Formik } from 'formik'
import StyledTextInput from '../components/StyledTextInput'
import StyledButton from '../components/StyledButton'

export default function SignIn({ navigation }) {
	const validate = (values) => {
		const errors = {}

		if (!values.email) {
			errors.email = 'Email is Required'
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Invalid Email Address'
		}

		if (!values.password) {
			errors.password = 'Password is Required'
		} else if (values.password.length < 6) {
			errors.password = 'Password must be at least 6 characters'
		}

		// si no hay errores que no devuelva nada
		// if (!Object.keys(errors).length) return
		// console.log(errors)
		return errors
	}

	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Sing in</Text>
			<Formik validate={validate} initialValues={{ email: '', password: '' }} onSubmit={(values) => console.log(values)}>
				{({ handleSubmit, values, errors, handleChange }) => (
					<View>
						<StyledTextInput style={errors.email && { borderColor: 'red' }} placeholder='Email' value={values.email} onChangeText={handleChange('email')} />
						{errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

						<StyledTextInput style={errors.password && { borderColor: 'red' }} placeholder='Password' secureTextEntry={true} value={values.password} onChangeText={handleChange('password')} />
						{errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							{/* si hay errores quiero que se deshabillite el sumbit */}
							{Object.keys(errors).length ? (
								<StyledButton disabled style={{ backgroundColor: 'gray' }}>
									Sign In
								</StyledButton>
							) : (
								<StyledButton onPress={handleSubmit} style={{ backgroundColor: 'green' }}>
									Sing In
								</StyledButton>
							)}

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
	}
	// input: {
	// 	height: 40,
	// 	margin: 12,
	// 	borderWidth: 1,
	// 	padding: 10,
	// 	backgroundColor: 'white',
	// 	borderRadius: 10
	// }
})
