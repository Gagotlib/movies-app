import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
// import { Picker } from '@react-native-picker/picker'

export default function App({ selectedValue, setSelectedValue, setIsFilterOpen, isSortingOpen, setIsSortingOpen, setIsGenreOpen, setIsDirectorOpen, setIsYearOpen }) {
	return (
		<View className='flex w-1/2 h-auto rounded-lg item-center justify-center '>
			<Pressable
				onPress={() => {
					setIsSortingOpen(!isSortingOpen)
					setIsFilterOpen(false)
					setIsGenreOpen(false)
					setIsDirectorOpen(false)
					setIsYearOpen(false)
				}}
				className='  h-10 rounded-lg items-center justify-center '
			>
				<View style={styles.container}>
					<Text style={styles.label}>{!selectedValue ?  <FontAwesome name='sort-amount-desc' size={20} color='black' /> : selectedValue} </Text>
				</View>
			</Pressable>
			{isSortingOpen && (
				<View>
					<Pressable
						onPress={() => {
							setSelectedValue('Title')
							setIsSortingOpen(false)
						}}
						style={styles.picker}
					>
						<Text style={styles.selectedValue}>Title (A-Z)</Text>
					</Pressable>
					<Pressable
						onPress={() => {
							setSelectedValue('Newest')
							setIsSortingOpen(false)
						}}
						style={styles.picker}
					>
						<Text style={styles.selectedValue}>Year (Newest - Oldest)</Text>
					</Pressable>
					<Pressable
						onPress={() => {
							setSelectedValue('Oldest')
							setIsSortingOpen(false)
						}}
						style={styles.picker}
					>
						<Text style={styles.selectedValue}>Year (Oldest - Newest)</Text>
					</Pressable>
					<Pressable
						onPress={() => {
							setSelectedValue(null)
							setIsSortingOpen(false)
						}}
						style={styles.picker}
					>
						<Text style={styles.selectedValue}>Cancel</Text>
					</Pressable>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		// height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		marginLeft: 5
	},
	label: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	picker: {
		height: 50,
		width: '100%',
		// borderWidth: 2,
		// borderColor: 'black',
		// borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	selectedValue: {
		marginLeft: 5,
		fontSize: 14
	}
})
