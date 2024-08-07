import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'

export default function App({selectedValue, setSelectedValue}) {


	return (
		<View style={styles.container}>
			{/* <Text style={styles.label}>Select an option:</Text> */}
			<Picker selectedValue={selectedValue} style={styles.picker} onValueChange={(itemValue) => setSelectedValue(itemValue)}>
				<Picker.Item label='Sort by...' value={null} />
				<Picker.Item label='Title (A-Z)' value='Title' />
				<Picker.Item label='Year (earliest - latest)' value='Newest' />
				<Picker.Item label='Year (latest - earliest)' value='Latest' />
				{/* <Picker.Item label='Option 3' value='option3' /> */}
			</Picker>
			{selectedValue && <Text style={styles.selectedValue}>Selected: {selectedValue}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 20,
    marginTop: 20,
    height: 10,
    
	},
	label: {
    fontSize: 16,
		marginBottom: 10,
	},
	picker: {
		height: 50,
		width: '100%'
	},
	selectedValue: {
    marginTop: 10,
		fontSize: 20,

	}
})
