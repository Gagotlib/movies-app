import { View, Text } from 'react-native'
import React from 'react'
import SignIn from '../../app/signin'
// import SignIn from './SignIn'

export default function MyProfile() {
	const user = false

	return (
		<View >
			{user ? (
				<>
					<Text>MyProfile</Text>
					<Text>Welcome [nombre ]</Text>
				</>
			) : (
				<View>
					<SignIn />
				</View>
			)}
		</View>
	)
}
