import { View, Text, TextInput, Button, StatusBar, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from 'expo-checkbox';
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FarmerHeader } from '../../components/headers/FarmerHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function UpdateStocks() {
  const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const [stockName, setStockName] = useState('');
	const [category, setCategory] = useState('');
	const [quantity, setQuantity] = useState('');
	const [qtUnit, setQtUnit] = useState('');
	const [price1, setPrice1] = useState('');
	const [price2, setPrice2] = useState('');
	const [isOrganic, setIsOrganic] = useState(false);
	const [specialNote, setSpecialNote] = useState('');
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);

	const categories = ['Category 1', 'Category 2', 'Category 3'];

	const handleAddStock = () => {
		// TODO
	};

	const handleDeleteStock = () => {
		// TODO
	};

	const handleImageUpload = () => {
		// TODO
		try {
			setUploadedImage('./assets/carrot-head.png');
			console.log(uploadedImage);
		} catch (error) {
			console.error("Error setting the image:", error);
		}
	}


	return (
		<View style={{
			paddingTop: insets.top,
			paddingBottom: insets.bottom,
			paddingLeft: insets.left,
			paddingRight: insets.right
		}}>
			<StatusBar backgroundColor="white" barStyle="dark-content" />
			<View style={{ flex: 0 }}>
				<FarmerHeader navigation={navigation} title='Update Stock' headerRight={false} back={true} />
			</View>


			<ScrollView style={{ flex: 0, marginTop: 50, marginBottom: 25 }} contentContainerStyle={{ flexGrow: 1 }}>
				<View style={{ margin: 10, borderWidth: 5, borderRadius: 15, borderColor: 'rgba(128, 128, 128, 0.1)', overflow: 'hidden' }}>

					<View style={styles.formContainer}>

						{/* Area for the image */}
						<View style={styles.imageContainer}>
							{uploadedImage ? (
								<Image source={require('./assets/carrot-head.png')} style={styles.image} />
							) : (
								<Image source={require('./assets/carrot-head.png')} style={styles.image} />
							)}
							{/* Image Upload Button */}
							<TouchableOpacity style={styles.uploadImageButton} onPress={handleImageUpload}>
								<Text style={styles.buttonText}>Upload Image</Text>
							</TouchableOpacity>
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
							<View style={styles.priceContainer}>
								<TextInput
									style={[styles.inputDefault, {flex:2, marginEnd:15}]}
									placeholder="Quantity (number)"
									value={quantity}
									onChangeText={(text) => setQuantity(text)}
								/>
								<TextInput
									style={[styles.inputDefault, {flex:1}]}
									placeholder="Unit"
									value={qtUnit}
									onChangeText={(text) => setQtUnit(text)}
								/>
							</View>

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
							<TouchableOpacity style={styles.addButton} onPress={handleAddStock}>
								<Text style={styles.buttonText}>Add</Text>
							</TouchableOpacity>

							{/* Delete Button */}
							<TouchableOpacity style={styles.deleteButton} onPress={handleDeleteStock} >
								<Text style={styles.buttonText}>Delete</Text>
							</TouchableOpacity>
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
	image: {
		width: '100%',
		height: '100%',
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
	uploadImageButton: {
		position: 'absolute',
		borderRadius: 10,
		overflow: 'hidden',
		marginVertical: 10,
		backgroundColor: 'rgba(128, 128, 128, 0.4)',
		padding: 8
	},
	addButton: {
    backgroundColor: '#10893E', // #3c802f  #10893E
    borderRadius: 10,
    paddingVertical: 15,
		paddingHorizontal: 30,
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 70,
		width: 'auto',
		alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
		fontSize: 15
  },
	deleteButton: {
		borderRadius: 10,
    paddingVertical: 15,
		paddingHorizontal: 30,
    alignItems: 'center',
		overflow: 'hidden',
		width: 'auto',
		alignSelf: 'center',
		marginBottom: 40,
		backgroundColor: 'red',
	}
});