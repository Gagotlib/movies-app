import React, { useEffect, useRef } from 'react'
import { View, Animated, Easing, StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native'

export default function RotatingIcon() {
	// Crear un valor animado
	const rotation = useRef(new Animated.Value(0)).current

	useEffect(() => {
		// Configurar una animación de rotación continua
		const startRotation = () => {
			rotation.setValue(0) // Resetear el valor a 0
			Animated.loop(
				Animated.timing(rotation, {
					toValue: 1,
					duration: 1000, // Duración de la animación en milisegundos
					easing: Easing.linear,
					useNativeDriver: true // Usar el motor nativo para un mejor rendimiento
				})
			).start()
		}

		startRotation() // Iniciar la animación
	}, [rotation])

	// Interpolar el valor de rotación a una rotación en grados
	const spin = rotation.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg']
	})

	return (
		<View style={styles.container}>
			{/* Puedes usar cualquier componente que desees rotar */}
			<Animated.View style={{ transform: [{ rotate: spin }] }}>
				<ActivityIndicator size='large' color='#0000ff' />
			</Animated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {

		justifyContent: 'center',
		alignItems: 'center'
	}
})
