import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'


const _layout = () => {
	return (
		<View className='flex-1 bg-gray-100'>
			<Stack
				screenOptions={{
					// headerStyle: { backgroundColor: 'rgba(255, 255, 255' },
					// headerTitleStyle: { color: 'black' },
					headerTitle: 'Movies App',
					// headerRight: () => (
					// 	<View className='flex flex-row items-center gap-3'>
					// 		{/* <Text className='text-xl'>Movies App</Text> */}
					// 		<Link href='/signin' className='px-4 py-2 font-bold text-center text-white bg-blue-700 rounded-lg'>
					// 			Sign In
					// 		</Link>
					// 	</View>
					// )
				}}
			/>

			
		</View>
	)
}

export default _layout

const styles = StyleSheet.create({})
