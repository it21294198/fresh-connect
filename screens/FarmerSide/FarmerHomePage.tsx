import { View, Text, StatusBar, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FarmerHeader } from '../../components/headers/FarmerHeader';
import CustomCard from './CustomCard';

export default function FarmerHomePage() {
  const navigation = useNavigation();
	const insets = useSafeAreaInsets();

	const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];
	const items = [
		{ name: 'Carrot', date: '08/10/2023', price: '500/100g'}, 
		{ name: 'NotCarrot', date: '08/10/2023', price: '500/100g'}
	]

	return (
		<View style={{
			paddingTop: insets.top,
			paddingBottom: insets.bottom,
			paddingLeft: insets.left,
			paddingRight: insets.right
		}}>
			<StatusBar backgroundColor="white" barStyle="dark-content" />
			<View style={{ flex: 0 }}>
				<FarmerHeader navigation={navigation} title='Home' headerRight={false} back={false} />
			</View>

			<ScrollView style={{ flex: 0, marginTop: 50, marginBottom: 35, padding: 20 }} contentContainerStyle={{ flexGrow: 1 }}>
			<View style={styles.row}>
        <Text style={styles.boldText}>Address</Text>
        <Text style={styles.addressText}>123 Example Street, City</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.boldText}>Open Hours</Text>
        <View>
          <Text style={styles.dayRangeText}>Mon - Fri</Text>
          <Text style={styles.timeRangeText}>9:00 AM - 5:00 PM</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddStocks')}>
        <Text style={styles.addButtonText}>Add Stock</Text>
      </TouchableOpacity>

      {/* Search bar component here */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {categories.map((category, index) => (
          <TouchableOpacity style={styles.categoryButton} key={index}>
            <Text style={styles.categoryButtonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.divider} />

      <Text style={[styles.boldText, styles.newestAdditions]}>Newest Additions</Text>

				{items.map((item, index) => (
					<CustomCard
						key={index}
						name={item.name}
						date={item.date}
						price={item.price}
					/>
))}
			</ScrollView>
      
    </View>
  )
}


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
	newestAdditions: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 18
	},
  addressText: {
    textAlign: 'right',
  },
  dayRangeText: {
    textAlign: 'right',
  },
  timeRangeText: {
    textAlign: 'right',
  },
  divider: {
    height: 4,
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
    marginVertical: 20,
  },
  addButton: {
    backgroundColor: '#10893E', // #3c802f  #10893E
    borderRadius: 10,
    paddingVertical: 15,
		paddingHorizontal: 30,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
		width: 'auto',
		alignSelf: 'center'
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#E5E5EA',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  categoryButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});