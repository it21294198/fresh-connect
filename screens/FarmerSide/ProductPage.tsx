import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function ProductPage() {
	const navigation = useNavigation();


	return (
		<View>
			<Text>ProductPage</Text>
			<Button title="Add Stocks" onPress={() => navigation.navigate('AddStocks')} />
		</View>
	)
}