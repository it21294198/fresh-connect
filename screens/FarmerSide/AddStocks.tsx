import { View, Text, TextInput, Button, StatusBar, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from 'expo-checkbox';
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FarmerHeader } from '../../components/headers/FarmerHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AddStocks() {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const [stockName, setStockName] = useState('');
	const [category, setCategory] = useState(''); 
	const [quantity, setQuantity] = useState('');
	const [price1, setPrice1] = useState('');
	const [price2, setPrice2] = useState('');
	const [isOrganic, setIsOrganic] = useState(false);
	const [specialNote, setSpecialNote] = useState('');

	const categories = ['Category 1', 'Category 2', 'Category 3']; 

	const handleAddStock = () => {
		// TODO
	};


	return (
		<View style={{
			paddingTop: insets.top,
			paddingBottom: insets.bottom,
			paddingLeft: insets.left,
			paddingRight: insets.right
		}}>
			<StatusBar backgroundColor="white" barStyle="dark-content" />
			<View style={{ flex: 0 }}>
				<FarmerHeader navigation={navigation} title='Add Stock' headerRight={false} back={true} />
			</View>

			<ScrollView style={{ flex: 0, marginTop: 50, marginBottom: 25 }} contentContainerStyle={{ flexGrow: 1 }}>
				<View style={{ margin: 10, borderWidth: 5, borderRadius: 15, borderColor: 'rgba(128, 128, 128, 0.1)', overflow: 'hidden' }}>
					<View style={styles.formContainer}>
						{/* Empty area with an image upload button */}
						<View style={styles.imageContainer}>
							{/* Image Upload Button */}
							<View style={styles.button}>
								<Button title="Upload Image" />
							</View>
						</View>
				<View style={{ marginTop: 45, padding: 15, borderWidth: 5, borderRadius: 15, borderColor: 'rgba(128, 128, 128, 0.1)', overflow: 'hidden' }}>

						{/* Stock Name */}
						<TextInput
							style={styles.inputDefault}
							placeholder="Stock Name"
							value={stockName}
							onChangeText={(text) => setStockName(text)}
						/>

						{/* Category Dropdown */}
						<Picker
							selectedValue={category}
							onValueChange={(itemValue) => setCategory(itemValue)}
						>
							{categories.map((cat, index) => (
								<Picker.Item label={cat} value={cat} key={index} />
							))}
						</Picker>

						{/* Quantity */}
						<TextInput
							style={styles.inputDefault}
							placeholder="Quantity"
							value={quantity}
							onChangeText={(text) => setQuantity(text)}
						/>

						{/* Price per Unit */}
						<View style={styles.priceContainer}>
							<TextInput
								style={styles.input}
								placeholder="Price (RS)"
								value={price1}
								onChangeText={(text) => setPrice1(text)}
							/>
							<Text>per</Text>
							<TextInput
								style={styles.input}
								placeholder="Unit | eg: 100g"
								value={price2}
								onChangeText={(text) => setPrice2(text)}
							/>
						</View>

						{/* Organically made product */}
						<View style={styles.checkboxContainer}>
							<CheckBox value={isOrganic} onValueChange={setIsOrganic} />
							<Text>     Organically made product</Text>
						</View>

						{/* Special Note */}
						<TextInput
							style={styles.textArea}
							placeholder="Anything special you want to say to the customer about this product? Type here"
							multiline={true}
							numberOfLines={4}
							value={specialNote}
							onChangeText={(text) => setSpecialNote(text)}
						/>

						{/* Add Button */}
						<View style={styles.addButton}>
							<Button title="Add" onPress={handleAddStock} />
						</View>
					</View>
				</View>
				</View>
			</ScrollView>
		</View>
	)
}


const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
	},
	formContainer: {
		margin: 0,
		padding: 0,
	},
	imageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 200,
		width: '100%',
		backgroundColor: 'rgba(128, 128, 128, 0.5)',
		borderRadius: 10,
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 17,
		marginVertical: 10,
		paddingHorizontal: 10,
	},
	inputDefault: {
		height: 40,
		borderWidth: 1,
		borderBottomColor: 'gray',
		borderLeftColor: 'rgba(128, 128, 128, 0.0)',
		borderRightColor: 'rgba(128, 128, 128, 0.0)',
		borderTopColor: 'rgba(128, 128, 128, 0.0)',
		marginVertical: 10,
		paddingHorizontal: 10,
	},
	priceContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 10,
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 15,
	},
	textArea: {
		height: 100,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 10,
		marginVertical: 10,
		paddingLeft: 10,
	},
	button: {
		borderRadius: 10,
		overflow: 'hidden',
		marginVertical: 10,
	},
	addButton: {
		borderRadius: 10,
		overflow: 'hidden',
		marginTop: 70,
		marginBottom: 40,
	}
});