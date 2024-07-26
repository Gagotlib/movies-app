import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Slot, Stack } from 'expo-router'
import { Header } from 'react-native/Libraries/NewAppScreen'

const _layout = () => {
	return (
		<View className='flex-1  bg-gray-100'>
			<Stack
				screenOptions={{
					// headerStyle: { backgroundColor: 'rgba(255, 255, 255' },
					// headerTitleStyle: { color: 'black' },
          headerTitle: "Movies App",
					headerRight: () => (
						<View className='flex flex-row items-center gap-3'>
							{/* <Text className='text-xl'>Movies App</Text> */}
							<Link href='/signin' className='text-center bg-blue-700 py-2 px-4 rounded-lg text-white font-bold'>
								Sign In
							</Link>
						</View>
					)
				}}
			/>
		</View>
	)
}

export default _layout

const styles = StyleSheet.create({})
