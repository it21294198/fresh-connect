import { View, Text, TextInput, Button, StatusBar, ScrollView, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from 'expo-checkbox';
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FarmerHeader } from '../../components/headers/FarmerHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Product, deleteProduct, fetchCategories, updateProduct } from '../../util/FarmerDbHooks';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingFalse, setLoadingTrue } from '../../features/connection/loaderSlice';
import { UserLogin } from '../../util/interfaces';

export default function UpdateStocks({route}) {
	const dispatch = useDispatch();
  const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const { product } = route.params as { product: Product };
	const [stockName, setStockName] = useState(product.name);
	const [category, setCategory] = useState(product.category);
	const [categories, setCategories] = useState<string[]>([]);
	const [quantity, setQuantity] = useState(`${product.quantity}`);
	const [qtUnit, setQtUnit] = useState(product.qtUnit);
	const [price, setPrice] = useState(`${product.price}`);
	const [perUnit, setPerUnit] = useState(`${product.per}${product.perUnit}`);
	const [isOrganic, setIsOrganic] = useState(product.organic);
	const [specialNote, setSpecialNote] = useState(product.specialMsg || '');
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);

	let uId:string|null = useSelector((state:{user:UserLogin})=>state.user.userId);
	// uId = 'JAAcrEfH1LPGi9NddZz16ZegLVK2'; // remove later

	useEffect(() => {
    async function fetchData() {
			dispatch(setLoadingTrue());
      setCategories(await fetchCategories());
			dispatch(setLoadingFalse());
		}
		fetchData();
  }, [])

	const handleUpdateStock = async () => {
		dispatch(setLoadingTrue());

		// separate unit and amount
		let iPer = 0;
		let iPerUnit = '';
		const matches = perUnit.match(/(\d+)([a-zA-Z]+)/);
		if (matches) {
			iPer = parseInt(matches[1]);
			iPerUnit = matches[2];
		}

		// set variables
		product.name = stockName;
		product.category = category;
		product.quantity = parseInt(quantity);
		product.qtUnit = qtUnit;
		product.price = parseInt(price);
		product.per = iPer;
		product.perUnit = iPerUnit;
		product.organic = isOrganic;
		product.specialMsg = specialNote;

		await updateProduct(product, uId);

		dispatch(setLoadingFalse());
		navigation.goBack();
	};

	const handleDeleteStock = async () => {
		dispatch(setLoadingTrue());
		await deleteProduct(uId, product.id);
		setDeleteModalVisible(false);
		dispatch(setLoadingFalse());
		navigation.goBack();
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
									value={price}
									onChangeText={(text) => setPrice(text)}
								/>
								<Text>per</Text>
								<TextInput
									style={styles.input}
									placeholder="Unit | eg: 100g"
									value={perUnit}
									onChangeText={(text) => setPerUnit(text)}
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
							<TouchableOpacity style={styles.addButton} onPress={handleUpdateStock}>
								<Text style={styles.buttonText}>Update</Text>
							</TouchableOpacity>

							{/* Delete Button */}
							<TouchableOpacity style={styles.deleteButton} onPress={() => setDeleteModalVisible(true)} >
								<Text style={styles.buttonText}>Delete</Text>
							</TouchableOpacity>

							{/* Delete Confirmation Modal */}
							<Modal
								visible={deleteModalVisible}
								transparent={true} 
								animationType="fade"
								hardwareAccelerated
								onRequestClose={() => {
									setDeleteModalVisible(false);
								}}
							>
								<View style={styles.modalContainer}>
									<View style={styles.modalContent}>
										<Text style={styles.modalText}>
											{`⚠️ \nAre you sure you want to delete this item?\n`}
										</Text>
										<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
											<TouchableOpacity
												onPress={() => setDeleteModalVisible(false)}
												style={styles.cancelButton}
											>
												<Text style={styles.buttonText}>Cancel</Text>
											</TouchableOpacity>
											<TouchableOpacity
												onPress={handleDeleteStock}
												style={styles.confirmButton}
											>
												<Text style={styles.buttonText}>Confirm</Text>
											</TouchableOpacity>
										</View>
									</View>
								</View>
							</Modal>
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
    backgroundColor: '#45A053', // fig #45A053   #3c802f  #10893E #10893E
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
		fontSize: 15,
		textAlign: 'center',
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
	},

	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
},
modalContent: {
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: 'red',
		borderRadius: 10,
		padding: 20,
		width: 300,
		elevation: 20
},
modalText: {
		fontSize: 18,
		marginBottom: 10,
		color: '#333',
		textAlign: 'center'
},
cancelButton: {
		backgroundColor: 'lightgray',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		marginRight: 10,
},
confirmButton: {
		backgroundColor: 'red', 
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
},
});