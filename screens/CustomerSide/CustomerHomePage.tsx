import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fireStore } from '../../config/firebase';
import { collection, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Input, Icon, Button, Div, Text, Header, Image } from "react-native-magnus";

interface ShopData {
  id: string;
  text: string;
}

export default function CustomerHomePage({ navigation }: any) {
  const [data, setData] = useState<ShopData[]>([]);

  const savedShops = [
    {
      shopId: '123',
      shopName: 'Nuwara Farm',
      description: 'Fresh fruits and vegatables available',
      address: 'No.43, Main Street, Kany'
    },
    {
      shopId: '124',
      shopName: 'Emerald Tea',
      description: 'All varieties of export quality tea available',
      address: 'No.43, Main Street, Kany'
    },
    {
      shopId: '125',
      shopName: 'Coconut Groves',
      description: 'Coconut and coconut related products available',
      address: 'No.43, Main Street, Kany'
    }
  ]

  useEffect(() => {
    fetchDataFromFirestore();
  }, []);

  const fetchDataFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(fireStore, 'text'));
      const items: any = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          ...doc.data(),
        })
      );
      setData(items);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const renderActvity = savedShops.map((shop) => {
    return (
      <Div m="sm" rounded="md" shadow='sm' p="md">
        <Div row alignItems="center">
          <Div flex={1}>
            <Text fontWeight="bold" fontSize="xl" mt="sm">
              {shop.shopName}
            </Text>
          </Div>
          <Button bg="green500" h={40} w={40} rounded="circle" ml="md">
            <Icon name="star" color="white" />
          </Button>
        </Div>
        <Div row alignItems="center">
          <Div
            rounded="xl"
            h={150}
            w={150}
            bgImg={require("./Assets/store.jpg")}
          />
          <Div flex={1}>
            <Text fontSize="xl" m="sm">
              {shop.description}
            </Text>
          </Div>
        </Div>
        <Div row flex={1}>
          <Button alignItems='flex-end' onPress={() => navigation.navigate('CustomerShopPage', { shop: shop })}>View</Button>
        </Div>
      </Div>
    )
  })


  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.container}>
        <Input
          placeholder="Search"
          p={10}
          m={20}
          focusBorderColor="green400"
          suffix={<Icon name="search" fontFamily="Feather" />}
        />
        <View style={styles.divider} />
        <Div row justifyContent="center" alignItems="center">
          <Button
            mt="lg"
            px="xl"
            py="lg"
            bg="white"
            borderWidth={1}
            borderColor="#45A053"
            color="#45A053"
            underlayColor="red100"
          >
            Vegetables
          </Button>
          <Button
            mt="lg"
            px="xl"
            py="lg"
            bg="white"
            mx="xl"
            borderWidth={1}
            borderColor="#45A053"
            color="#45A053"
            underlayColor="red100"
          >
            Fruits
          </Button>
          <Button
            mt="lg"
            px="xl"
            py="lg"
            bg="white"
            borderWidth={1}
            borderColor="#45A053"
            color="#45A053"
            underlayColor="red100"
          >
            Dairy
          </Button>
        </Div>
        <View style={styles.divider} />
        <Div p="xl" shadow="sm" rounded="md" bg='white' mx='sm'>
          <Text fontWeight="bold" fontSize="4xl" mt="md" textAlign='center'>Activity From Shops</Text>

          {renderActvity}

        </Div>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    marginTop: 30,
    borderColor: '#D9D9D9',
    borderWidth: 3,
    marginHorizontal: 10,
    marginBottom: 30
  },
  list: {
    width: 'auto'
  },
  scrollview: {
    flex: 1,
    minHeight: '100%'
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  }

});
