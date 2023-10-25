import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CustomCard = ({ name, date, price, } :{name:string, date:string, price:string}) => {
  const navigation = useNavigation();
	const iconSource = './assets/Edit-Square.png';
	const logoSource = './assets/organic.png';
	const imageSource = './assets/carrot-head.png';

  return (
    // TODO link to a product view 
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProductPage')}>
      <View style={styles.imageArea}>
        <Image source={require(imageSource)} style={styles.image} />
        {/* edit button */}
				<TouchableOpacity style={styles.editIconContainer} onPress={() => navigation.navigate('UpdateStocks')}>
        	<Image source={require(iconSource)} style={styles.editIcon} />
				</TouchableOpacity>
      </View>

      <View style={styles.textArea}>
        <View style={styles.header}>
          <Text style={styles.title}>{name}</Text>
          {/* organic logo */}
          <Image source={require(logoSource)} style={styles.logo} />
        </View>
        <View style={styles.details}>
          <View style={styles.leftDetail}>
            <Text>Date added: </Text>
            <Text>{date}</Text>
          </View>
          <View style={styles.rightDetail}>
            <Text>{price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: width * 0.7,
    borderRadius: 15,
    backgroundColor: 'white',
		marginVertical: 10,
		elevation: 2,
		overflow: 'hidden'
  },
  imageArea: {
    width: '100%',
    height: width * 0.45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
		position: 'relative',
  },
  logo: {
    width: 37,
    height: 37,
		margin: 5
  },
	editIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 20,
    backgroundColor: 'white',
		position: 'absolute',
    top: -6,
    right: -6,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
  },
  editIcon: {
		width: 20,
    height: 20,
    backgroundColor: 'white',
  },
	image: {
		width: '100%',
		height: '100%',
	},
  textArea: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
		fontSize: 18
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightDetail: {
    width: 'auto',
    alignSelf: 'center',
    backgroundColor: '#10893E',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default CustomCard;