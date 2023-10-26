import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fireStore } from '../../config/firebase';
import { collection, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Input, Icon, Button, Div, Text, Header, Image } from "react-native-magnus";
import { getSavedShops, getShopById, getShops } from './CustomerController';
import { CustomerHeader } from '../../components/headers/CustomerHeader';
import { CommonHeader } from '../../components/headers/CommonHeader';
import { UserLogin } from '../../util/interfaces';
import { useSelector } from 'react-redux';


export default function CustomerHomePage({ navigation }: any) {
  const [data, setData] = useState<any[]>([]);
  const [Keyword, setKeyword] = useState("");
  let uId:any = useSelector((state:{user:UserLogin})=>state.user.userId)?.toString()

  async function receiveData() {
    // const newData: any = await getShops()
    // setData(newData)
    const newD: any = await getSavedShops(uId)
    const savedShopsPromises = newD.map((data: any) => getShopById(data))
    Promise.all(savedShopsPromises)
      .then((shops) => {
        // 'shops' will be an array of results
        setData(shops)
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
    // const savedShops:any = [];
    // newD.map((data:any)=>{
    //   savedShops.push(getShopById(data))
    // })
    // setData(savedShops.object)
    // console.log(savedShops)
    // console.log(newD)
  }

  const filteredData = data.filter((data) => {
    const name = data.shopName.toLowerCase()
    const description = data.description.toLowerCase()
    const email = data.email.toLowerCase()
    const contactNo = data.contactNo.toString().toLowerCase()
    const address = data.address.toLowerCase()
    const keyword = Keyword.toLowerCase()

    return name.includes(keyword) || description.includes(keyword) || email.includes(keyword) || contactNo.includes(keyword) || address.includes(keyword)
  })

  useEffect(() => {
    receiveData()
  }, [data])

  // const user = {
  //   id: "8SoZKFk8U0q6l2lEbogL",
  //   name: 'John'
  // }

  // const savedShops = [
  //   {
  //     shopId: '123',
  //     shopName: 'Nuwara Farm',
  //     userId: "Z04NU1rDCHE8GNus2HbL",
  //     description: 'Fresh fruits and vegatables available',
  //     openHours: ["10:00", "16:30"],
  //     contactNo: "0777124568",
  //     email: "farmer@email.com",
  //     address: 'No.43, Main Street, Kandy'
  //   },
  //   {
  //     shopId: '124',
  //     shopName: 'Emerald Tea',
  //     userId: "Z04NU1rDCHE8GNus2HbL",
  //     description: 'All varieties of export quality tea available',
  //     openHours: ["09:00", "16:30"],
  //     contactNo: "0777124568",
  //     email: "farmer@email.com",
  //     address: 'No.43, Main Street, Kany'
  //   },
  //   {
  //     shopId: '125',
  //     shopName: 'Coconut Groves',
  //     userId: "Z04NU1rDCHE8GNus2HbL",
  //     description: 'Coconut and coconut related products available',
  //     openHours: ["09:00", "16:30"],
  //     contactNo: "0777124568",
  //     email: "farmer@email.com",
  //     address: 'No.43, Main Street, Kany'
  //   }
  // ]

  const renderActvity = filteredData.map((shop, index) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('CustomerShopPage', { user: uId, shopId: shop.userId })}>
      <Div key={index} m="sm" rounded="lg" bg="white" shadow="md" p="xl">
        <Div row alignItems="center">
          <Div flex={1}>
            <Text fontWeight="bold" fontSize="xl" mt="sm">
              {shop.shopName}
            </Text>
          </Div>
          <Button bg="#45A053" h={40} w={40} rounded="circle" ml="md">
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
        <Div row justifyContent='flex-end'>
          <Button bg='#45A053' rounded={17.5}>View</Button>
        </Div>
      </Div>
      </TouchableOpacity>
    )
  })


  return (
    <>
      <CustomerHeader navigation={navigation} title='Home' headerRight={false} back={false}/>
      <ScrollView style={styles.scrollview}>
        <View style={styles.container}>
          <Input
            placeholder="Search"
            p={10}
            m={20}
            onChangeText={text => setKeyword(text)}
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
              onPress={() => setKeyword('Vegetables')}
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
              onPress={() => setKeyword('Fruits')}
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
              onPress={() => setKeyword('Dairy')}
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    marginTop: 30,
    borderColor: '#D9D9D9',
    backgroundColor: '#D9D9D9',
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
