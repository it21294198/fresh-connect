import { View, Text, TextInput, Button, StatusBar, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FarmerHeader } from '../../components/headers/FarmerHeader';
import { Div } from 'react-native-magnus';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import CheckBox from 'expo-checkbox';
import { Product, fetchCategories } from '../../util/FarmerDbHooks';

export default function ProductPage({ route }) {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const { product } = route.params as { product: Product };
	// const [stockName, setStockName] = useState(product.name);
	// const [category, setCategory] = useState(product.category);
	// const [quantity, setQuantity] = useState(`${product.quantity}`);
	// const [qtUnit, setQtUnit] = useState(product.qtUnit);
	// const [price, setPrice] = useState(`${product.price}`);
	// const [perUnit, setPerUnit] = useState(`${product.per}${product.perUnit}`);
	// const [isOrganic, setIsOrganic] = useState(product.organic);
	// const [specialNote, setSpecialNote] = useState(product.specialMsg || '');
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);


	return (
		<View style={{
			paddingTop: insets.top,
			paddingBottom: insets.bottom,
			paddingLeft: insets.left,
			paddingRight: insets.right
		}}>
				<StatusBar backgroundColor="white" barStyle="dark-content" />
				<View style={{ flex: 0 }}>
					<FarmerHeader navigation={navigation} title='Product page' headerRight={false} back={true}/>
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
						</View>

						<View style={{ marginTop: 45, padding: 15, borderWidth: 5, borderRadius: 15, borderColor: 'rgba(128, 128, 128, 0.1)', overflow: 'hidden' }}>

							<View style={styles.inputDefault}>
								<Text style={{fontSize:19, fontWeight:'bold'}}>{product.name}</Text>
							</View>
							<Text>{`\n`}</Text>
							<View>
								{product.organic ? (<Image source={require('./assets/organic.png')} style={styles.logo} />) : null}
								<Text>{`\n`}</Text>

								<View style={styles.priceContainer}>
									<Text style={styles.normalText}>{` CATEGORY:`}</Text>
									<Text style={styles.normalText}>{`${product.category} `}</Text>
								</View>
								<View style={styles.priceContainer}>
									<Text style={styles.normalText}>{` STOCK:`}</Text>
									<Text style={styles.normalText}>{`${product.quantity} ${product.qtUnit} `}</Text>
								</View>
								<View style={styles.priceContainer}>
									<Text style={styles.normalText}>{` PRICE:`}</Text>
									<Text style={styles.normalText}>{`Rs:${product.price} per ${product.per}${product.perUnit} `}</Text>
								</View>
								<Text>{`\n`}</Text>

								{product.specialMsg ? (
									<View style={styles.textArea}>
										<Text>{product.specialMsg}</Text>
									</View>
								) : null}
							</View>

							{/* Edit Button */}
							<TouchableOpacity style={styles.editButton} onPress={() => {navigation.navigate('UpdateStocks', {product})}}>
								<Text style={styles.buttonText}>Edit</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}


const styles = StyleSheet.create({
	normalText: {
		fontSize: 15
	},
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
	textArea: {
		minHeight: 100,
		maxHeight: 'auto',
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 10,
		marginVertical: 10,
		paddingLeft: 10,
	},
	editButton: {
		backgroundColor: '#45A053', // fig #45A053   #3c802f  #10893E #10893E
    borderRadius: 10,
    paddingVertical: 15,
		paddingHorizontal: 30,
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 70,
		width: 'auto',
		alignSelf: 'center',
	},
	buttonText: {
    color: 'white',
    fontWeight: 'bold',
		fontSize: 15
  },
	logo: {
    width: 37,
    height: 37,
		margin: 5
  },
});