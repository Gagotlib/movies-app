import { View, Text, StyleSheet, Alert, Pressable } from 'react-native'
import React from 'react'
import StyledTextInput from '../src/components/StyledTextInput'
import StyledButton from '../src/components/StyledButton'
import axios from 'axios'
import { Form, Formik } from 'formik'
import { Link, router, Stack } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

const Register = ({ navigation }) => {
	const validate = (values) => {
		const errors = {}

		if (!values.username) {
			errors.username = 'Username is Required'
		} else if (values.username.length < 3) {
			errors.username = 'Username must be at least 3 characters'
		}

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

	const handleRegister = async (values) => {
		try {
			values.email = values.email.toLowerCase()

			const response = await axios.post('http://192.168.178.48:3000/users/', values)
			// console.log(response.data)
			Alert.alert('Register successful')
			router.navigate('/signin')
		} catch (error) {
			// console.error(error.response.data.message)
			const errorMessage = error.response?.data?.message
			Alert.alert('Register Error', errorMessage)
			// Alert.alert('Login Error', errorMessage)
		}
	}

	return (
		<View className='flex pt-20 w-fit items-center'>
			<Stack.Screen
				options={{
					headerRight: () => (
						<Link asChild href='/' className='bg-blue-700 py-2 px-4 rounded-lg text-white'>
							<Pressable>
								<FontAwesome name='home' size={24} color='white' />
							</Pressable>
						</Link>
					),
					headerTitle: 'Register'
				}}
			/>
			<View className='flex w-3/4'>
				<Text style={styles.h1}>Register</Text>
				<Formik validate={validate} initialValues={{ email: '', username: '', password: '' }} onSubmit={handleRegister}>
					{({ handleSubmit, values, errors, handleChange }) => (
						<View>
							<StyledTextInput style={errors.username && { borderColor: 'red' }} placeholder='Username' value={values.username} onChangeText={handleChange('username')} />
							{errors.username && <Text style={{ color: 'red' }}>{errors.username}</Text>}

							<StyledTextInput style={errors.email && { borderColor: 'red' }} placeholder='Email' value={values.email} onChangeText={handleChange('email')} />
							{errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

							<StyledTextInput style={errors.password && { borderColor: 'red' }} placeholder='Password' secureTextEntry={true} value={values.password} onChangeText={handleChange('password')} />
							{errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
							<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
								{/* si hay errores quiero que se deshabillite el sumbit */}
								{Object.keys(errors).length ? (
									<StyledButton disabled style={{ backgroundColor: 'gray' }}>
										Register
									</StyledButton>
								) : (
									<StyledButton onPress={handleSubmit} style={{ backgroundColor: 'green' }}>
										Register
									</StyledButton>
								)}

								{/* <Link asChild href='/'>
									<Pressable>
										<Text className='text-center bg-blue-700 py-2 px-4 rounded-lg text-white font-bold'>Back Home</Text>
									</Pressable>
								</Link> */}
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
	}
})

export default Register
