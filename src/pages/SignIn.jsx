import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Form, Formik } from 'formik'
import StyledTextInput from '../components/StyledTextInput'
import StyledButton from '../components/StyledButton'
import axios from 'axios'
import { Link, router } from 'expo-router'

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

		// console.log(errors)
		return errors
	}

	const handleLogin = async (values) => {
		try {
			values.email = values.email.toLowerCase()
			const response = await axios.post('http://192.168.178.48:3000/users/login', values)
			// console.log(response.data)
			Alert.alert('Login successful')
			//here goes logic to save de user in session

			router.push('/')
		} catch (error) {
			// console.error('Login failed:', error)
			const errorMessage = error.response?.data?.error || 'An error occurred during login'
			Alert.alert('Login Error', errorMessage)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Sing in</Text>
			<Formik validate={validate} initialValues={{ email: '', password: '' }} onSubmit={handleLogin}>
				{({ handleSubmit, values, errors, handleChange }) => (
					<View className='flex gap-5'>
						<StyledTextInput style={errors.email && { borderColor: 'red' }} placeholder='Email' value={values.email} onChangeText={handleChange('email')} />
						{errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

						<StyledTextInput style={errors.password && { borderColor: 'red' }} placeholder='Password' secureTextEntry={true} value={values.password} onChangeText={handleChange('password')} />
						{errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
						<View className='flex items-center'>
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

							{/* <StyledButton onPress={() => navigation.navigate('Main')}>Back Home</StyledButton> */}
						</View>
						<View className='flex items-center mt-10'>
							<Text style={styles.text}>Still not registered?</Text>
							{/* <Link asChild href='/register'> */}
							<Pressable onPress={() => navigation.navigate('Register')}>
								<Text className='py-2 font-bold text-center text-white bg-blue-700 px-7 rounded-3xl'>Register</Text>
							</Pressable>
							{/* </Link> */}
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
		padding: 20,
		justifyContent: 'center',
		// alignItems: 'center',
		gap: 20,
	},
	h1: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'black'
	},
	text: {
		textAlign: 'center',
		color: 'black',
		fontSize: 18,
		paddingVertical: 10
	}
})
