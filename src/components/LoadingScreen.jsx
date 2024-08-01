import  {SplashScreen}  from 'expo-router'
import { ActivityIndicator, Text, View, Animated } from 'react-native'
import RotatingIcon from './Icons'

export default function LoadingScreen() {
	return (
    <View className="items-center justify-center flex-1 ">
      <Text className='mb-20 text-xl'> Loading...</Text>
      <RotatingIcon />

    </View>
  )
}
