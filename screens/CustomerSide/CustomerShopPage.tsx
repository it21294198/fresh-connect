import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Input, Icon, Button, Div, Text, Header, Image } from "react-native-magnus";
import { getProducts, getShopById, saveShop } from './CustomerController';
import { CustomerHeader } from '../../components/headers/CustomerHeader';
import { UserLogin } from '../../util/interfaces';
import { useSelector } from 'react-redux';

export default function CustomerShopPage({ route, navigation }: any) {
  const [data, setData] = useState<any[]>([]);
  const [shop, setShop] = useState<any>();
  const [Keyword, setKeyword] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("null")
  const { user, shopId } = route.params
  let uId:any = useSelector((state:{user:UserLogin})=>state.user.userId)?.toString()
  let openTime: string = "Open"
  if (shop) {
    openTime = shop.openAt.toDate().toLocaleTimeString() + " - " + shop.closeAt.toDate().toLocaleTimeString()
  }

  async function receiveData() {
    const newData: any = await getProducts(shopId)
    setData(newData)
  }

  async function receiveShop() {
    const newData: any = await getShopById(shopId)
    setShop(newData)
  }

  async function saveNewShop() {
    await saveShop(uId,shopId)
    console.log("Shop Saved Successfully")
  }

  const filteredData = data?.filter((data) => {
    const name = data.name.toLowerCase()
    const category = data.category.toLowerCase()
    const price = data.price.toString().toLowerCase()
    const organic = data.organic.toString().toLowerCase()
    const specialMsg = data.specialMsg.toLowerCase()
    const keyword = Keyword.toLowerCase()

    return name.includes(keyword) || category.includes(keyword) || price.includes(keyword) || organic.includes(keyword) || specialMsg.includes(keyword)
  })

  useEffect(() => {
    receiveShop()
    receiveData()
  }, [data])

  const openNow = () => {
    if (shop) {
      let currentTime = new Date().getTime()
      let openH = shop.openAt.toDate().getTime()
      let closeH = shop.closeAt.toDate().getTime()

      if (currentTime >= openH && currentTime <= closeH) {
        console.log("Now open")
        return (
          <Text fontSize="xl" color="green500">
            Open Now
          </Text>
        )
      } else {
        console.log("Now closed")
        return (
          <Text fontSize="xl" color="red">
            Closed Now
          </Text>
        )
      }
    }
  }

  const products = [
    {
      name: 'Carrot',
      category: 'Vegetables',
      price: 100,
      per: 500,
      qtUnit: 'g',
      quantity: 500,
      organic: true,
      createdAt: '08/10/2023',
      buyBefore: '09/10/2023',
      specialMsg: "Please Contact us for any further queries",
      imageId: require("./Assets/carrot.jpg")
    },
    {
      name: 'Mango',
      category: 'Fruits',
      price: 200,
      per: 500,
      qtUnit: 'g',
      quantity: 500,
      organic: false,
      createdAt: '08/10/2023',
      buyBefore: '09/10/2023',
      specialMsg: "Please Contact us for any further queries",
      imageId: require("./Assets/mangoes.webp")
    },
    {
      name: 'Milk',
      category: 'Dairy',
      price: 300,
      per: 500,
      qtUnit: 'g',
      quantity: 500,
      organic: false,
      createdAt: '08/10/2023',
      buyBefore: '09/10/2023',
      specialMsg: "Please Contact us for any further queries",
      imageId: require("./Assets/milk.jpg")
    }
  ]

  const renderProducts = filteredData
    .filter((product) => {
      if (selectedCategory === "null") {
        // If no category is selected, show all products
        return true;
      } else {
        // Otherwise, show products that match the selected category
        return product.category === selectedCategory;
      }
    })
    .map((product, index) => {
      const newPrice = "Rs " + product.price + "/" + product.per + product.qtUnit;
      return (
        <Div key={index} m="sm" rounded="lg" bg="white" shadow="md" p="md">
          <Div row>
            <TouchableOpacity onPress={() => navigation.navigate('CustomerProductPage', { uId: uId, shop: shop, product: product })}>
              <Div
                rounded="xl"
                h={150}
                w={300}
                alignItems='center'
                bgImg={require("./Assets/carrot.jpg")}
              />
            </TouchableOpacity>
          </Div>
          <Div row>
            <Div flex={1} alignItems='flex-start'>
              <Text fontWeight="bold" fontSize="xl" mt="sm">
                {product.name}
              </Text>
            </Div>
            <Div flex={1} alignItems='flex-end'>
              {product.organic
                ? <Image h={50} w={50} source={require("./Assets/organic.png")} /> : null
              }
            </Div>
          </Div>
          <Div row>
            <Div flex={1} alignItems='flex-start'>
              <Text fontSize="md" mt={20} color="gray500">
                Date Added
              </Text>
            </Div>
            <Div flex={1} alignItems='center'>
              <Text fontSize="md" mt={20}>
                {product.createdAt.toDate().toLocaleDateString()}
              </Text>
            </Div>
            <Div flex={1} alignItems='flex-end' ml="xs">
              <Button mt="md" bg="#45A053" fontSize="md" rounded={17.5}>{newPrice}</Button>
            </Div>
          </Div>
        </Div>
      )
    })

  return (
    <>
      <CustomerHeader navigation={navigation} title="Shop" headerRight={false} back={true} />
      <ScrollView style={styles.scrollview}>
        <View style={styles.container}>
          <Div row flex={1} justifyContent='center' mt="sm">
            <Div
              w={150}
              h={150}
              rounded="circle"
              bgImg={require("../../assets/shop.jpg")}
            />
          </Div>
          <Div row>
            <Div flex={1} alignItems='flex-start' ml="lg">
              <Text fontSize="xl" fontWeight='bold' mt={20}>
                Address
              </Text>
            </Div>
            <Div flex={1} alignItems='flex-end' mr="lg">
              <Text fontSize="md" mt={25}>
                {shop && shop.address ? shop.address : null}
              </Text>
            </Div>
          </Div>
          <Div row mt="md">
            <Div flex={1} alignItems='flex-start' ml="lg">
              <Text fontSize="xl" fontWeight='bold'>
                Open Hours
              </Text>
            </Div>
            <Div flex={1} alignItems='flex-end' mr="lg">
              <Text fontSize="md">
                Monday - Friday
              </Text>
            </Div>
          </Div>
          <Div row>
            <Div flex={1} alignItems='flex-end' mr="lg">
              <Text fontSize="md">
                {openTime}
              </Text>
            </Div>
          </Div>
          <Div row>
            <Div flex={2} alignItems='flex-start' mt={20} ml="lg">
              {openNow()}
            </Div>
            <Div flex={1} alignItems='flex-end' mt="lg" mr="xs">
              <Button bg="#45A053" fontSize="md" onPress={saveNewShop} rounded={17.5} suffix={<Icon px="md" name="star" color="gray100" />}>Save shop</Button>
            </Div>
          </Div>
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
              onPress={() => setSelectedCategory('Vegetables')}
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
              onPress={() => setSelectedCategory('Fruits')}
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
              onPress={() => setSelectedCategory('Dairy')}
            >
              Dairy
            </Button>
          </Div>
          <View style={styles.divider} />
          <Div p="xl" shadow="sm" rounded="md" bg='white' mx='sm'>
            <Text fontWeight="bold" fontSize="4xl" mt="md" textAlign='center'>Newest Additions</Text>

            {renderProducts}

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

