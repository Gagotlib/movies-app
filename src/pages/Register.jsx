import { View, Text, StyleSheet, Alert, Pressable, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useRef } from 'react'
import StyledTextInput from '../components/StyledTextInput'
import StyledButton from '../components/StyledButton'
import axios from 'axios'
import { Form, Formik } from 'formik'
import { Link } from 'expo-router'

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
			navigation.navigate('SignIn')
		} catch (error) {
			// console.error(error.response.data.message)
			const errorMessage = error.response?.data?.message
			Alert.alert('Register Error', errorMessage)
			// Alert.alert('Login Error', errorMessage)
		}
	}

  const emailInputRef = useRef(null)
	const passwordInputRef = useRef(null)
	
	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
			<View style={styles.container}>
				{/* <Text style={styles.h1}>Register</Text> */}
				<Formik validate={validate} initialValues={{ email: '', username: '', password: '' }} onSubmit={handleRegister}>
					{({ handleSubmit, values, errors, handleChange }) => (
						<View className='flex gap-5'>
							<StyledTextInput
								style={errors.username && { borderColor: 'red' }}
								placeholder='Username'
								value={values.username}
								onChangeText={handleChange('username')}
							/>
							{errors.username && <Text style={{ color: 'red' }}>{errors.username}</Text>}

							<StyledTextInput
								style={errors.email && { borderColor: 'red' }}
								placeholder='Email'
								value={values.email}
								onChangeText={handleChange('email')}

							/>
							{errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

							<StyledTextInput
								style={errors.password && { borderColor: 'red' }}
								placeholder='Password'
								secureTextEntry={true}
								value={values.password}
								onChangeText={handleChange('password')}
								onSubmitEditing={handleSubmit}
							/>
							{errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

							<View className='flex flex-col items-center w-full'>
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

								<Link asChild href='/'>
									<Pressable style={styles.button}>
										<Text style={styles.buttonText}>Back Home</Text>
									</Pressable>
								</Link>
							</View>
						</View>
					)}
				</Formik>
			</View>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 0,
		paddingHorizontal: 20,
		gap: 20,
		justifyContent: 'center'
		// alignItems: 'center'
	},
	h1: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'black'
	},
	button: {
		backgroundColor: 'blue',
		paddingVertical: 15,
		margin: 10,
		borderRadius: 10,
		width: '85%',
		textAlign: 'center'
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold'
	}
})

export default Register
