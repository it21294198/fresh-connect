import { View, Text, Button, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { FarmerHeader } from '../../components/headers/FarmerHeader';
import { Div } from 'react-native-magnus';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

export default function ProductPage() {
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
					<FarmerHeader navigation={navigation} title='Products page' headerRight={false} back={false}/>
				</View>
				
				<ScrollView style={{ flex: 0, paddingTop: 60}} contentContainerStyle={{ flexGrow: 1 }}>
					<View >
						<Text>ProductPage</Text>
						<Button title="Add Stocks" onPress={() => navigation.navigate('AddStocks')} />
					</View>
				</ScrollView>
		</View>
	)
}