import { View, Text, StatusBar, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FarmerHeader } from '../../components/headers/FarmerHeader';
import CustomCard from './CustomCard';
import { Product, fetchCategories, fetchProducts } from '../../util/FarmerDbHooks';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogin } from '../../util/interfaces';
import { Timestamp } from 'firebase/firestore';
import { setLoadingFalse, setLoadingTrue } from '../../features/connection/loaderSlice';

export default function FarmerHomePage() {
  let uId:string|null = useSelector((state:{user:UserLogin})=>state.user.userId);
	uId = 'JAAcrEfH1LPGi9NddZz16ZegLVK2'; // remove later
  const dispatch = useDispatch()
  const navigation = useNavigation();
	const insets = useSafeAreaInsets();
  const [categories, setCategories] = useState<string[]>([]);
  const [items, setItems] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    dispatch(setLoadingTrue());
    setItems(await fetchProducts(uId as string));
    setCategories(await fetchCategories());
    dispatch(setLoadingFalse());
  }

  // get data
  useEffect(() => {
		fetchData();
  }, [])
  // on refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }

  // format date
  function formatDate(timestamp: Timestamp) {
    const date = timestamp.toDate();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // months start from 0
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
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
				<FarmerHeader navigation={navigation} title='Home' headerRight={false} back={false} />
			</View>

			<ScrollView style={{ flex: 0, marginTop: 50, marginBottom: 35, padding: 20 }} contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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

        {/* TODO Search bar component */}

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
            product={item}
            date={formatDate(item.createdAt)}
            price={`${item.price}/${item.per}${item.perUnit}`}
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