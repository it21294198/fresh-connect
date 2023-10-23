import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FarmerHeader } from '../../components/headers/FarmerHeader';

export default function FarmerHomePage() {
  const navigation = useNavigation();
	const insets = useSafeAreaInsets();


	return (
		<View style={{
			paddingTop: insets.top,
			paddingBottom: insets.bottom,
			paddingLeft: insets.left,
			paddingRight: insets.right
		}}>
			<StatusBar backgroundColor="white" barStyle="dark-content" />
			<FarmerHeader navigation={navigation} title='Home' headerRight={false} back={false} />
      <Text>FarmerHomePage</Text>
    </View>
  )
}