import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Form, Formik } from 'formik'
import StyledTextInput from '../src/components/StyledTextInput.jsx'
import StyledButton from '../src/components/StyledButton.jsx'
import axios from 'axios'
import { Link, router, Stack } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

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

	const handleLogin = async (values) => {
		try {
			values.email = values.email.toLowerCase()
			const response = await axios.post('http://192.168.178.48:3000/users/login', values)
			console.log(response.data)
			Alert.alert('Login successful')
			//here goes logic to save de user in session

			router.navigate('/')
		} catch (error) {
			console.error('Login failed:', error)
			const errorMessage = error.response?.data?.error || 'An error occurred during login'
			Alert.alert('Login Error', errorMessage)
		}
	}

	return (
		<View className='flex items-center pt-20'>
			<Stack.Screen
				options={{
					headerTitle: 'Login',
					headerRight: () => (
						<Link asChild href='/' className='px-4 py-2 text-white bg-blue-700 rounded-lg'>
							<Pressable>
								<FontAwesome name='home' size={24} color='white' />
							</Pressable>
						</Link>
					)
				}}
			/>
			<View className='flex w-3/4'>
				<Text style={styles.h1}>Login</Text>
				<Formik validate={validate} initialValues={{ email: '', password: '' }} onSubmit={handleLogin}>
					{({ handleSubmit, values, errors, handleChange }) => (
						<View>
							<StyledTextInput style={errors.email && { borderColor: 'red' }} placeholder='Email' value={values.email} onChangeText={handleChange('email')} />
							{errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

							<StyledTextInput style={errors.password && { borderColor: 'red' }} placeholder='Password' secureTextEntry={true} value={values.password} onChangeText={handleChange('password')} />
							{errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
							<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
								{/* <Link asChild href='/'>
									<Pressable>
										<Text className='px-4 py-2 font-bold text-center text-white bg-blue-700 rounded-lg'>Back Home</Text>
									</Pressable>
								</Link> */}
							</View>
							<View className='flex items-center'>
								<Text style={styles.text}>Still not registered?</Text>
								<Link asChild href='/register'>
									<Pressable>
										<Text className='px-4 py-2 font-bold text-center text-white bg-blue-700 rounded-lg'>Register</Text>
									</Pressable>
								</Link>
							</View>
						</View>
					)}
				</Formik>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({

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
