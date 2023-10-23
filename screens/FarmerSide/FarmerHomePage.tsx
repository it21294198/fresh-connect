import { View, Text, StatusBar, ScrollView } from 'react-native'
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
			<View style={{ flex: 0 }}>
				<FarmerHeader navigation={navigation} title='home Stock' headerRight={false} back={false} />
			</View>

			<ScrollView style={{ flex: 0, marginTop: 50, marginBottom: 25, padding: 20 }} contentContainerStyle={{ flexGrow: 1 }}>
				<Text>FarmerHomePage</Text>
			</ScrollView>
      
    </View>
  )
}