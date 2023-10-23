import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Input, Icon, Button, Div, Text, Header, Image } from "react-native-magnus";

interface ShopData {
  id: string;
  text: string;
}

export default function CustomerShopPage({ route, navigation }: any) {
  const [data, setData] = useState<ShopData[]>([]);
  const { shop } = route.params
  const openTime = shop.openHours[0] + " - " + shop.openHours[1]

  const openNow = () => {
    var d = new Date();
    var h = d.getHours();
    if (h === 0) { h = 24 }
    const openH = shop.openHours[0].split(":")
    const closeH = shop.openHours[1].split(":")

    if (h >= openH[0] && h <= closeH[0]) {
      return (
        <Text fontSize="xl" color="green500">
          Open Now
        </Text>
      )
    } else {
      return (
        <Text fontSize="xl" color="red">
          Closed Now
        </Text>
      )
    }
  }

  const products = [
    {
      name: 'Carrot',
      category: 'Vegetables',
      price: 100,
      per: 500,
      qtUnit: 'g',
      organic: true,
      createdAt: '08/10/2023',
      specialMsg: "Please Contact us for any further queries",
      imageId: require("./Assets/carrot.jpg")
    },
    {
      name: 'Mango',
      category: 'Fruits',
      price: 200,
      per: 500,
      qtUnit: 'g',
      organic: false,
      createdAt: '08/10/2023',
      specialMsg: "Please Contact us for any further queries",
      imageId: require("./Assets/mangoes.webp")
    },
    {
      name: 'Milk',
      category: 'Dairy',
      price: 300,
      per: 500,
      qtUnit: 'g',
      organic: false,
      createdAt: '08/10/2023',
      specialMsg: "Please Contact us for any further queries",
      imageId: require("./Assets/milk.jpg")
    }
  ]

  const renderProducts = products.map((product) => {
    const newPrice = "Rs " + product.price + "/" + product.per + product.qtUnit;
    return (
      <Div m="sm" rounded="md" shadow='sm' p="md">
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
          <TouchableOpacity onPress={() => navigation.navigate('CustomerProductPage', { product: product })}>
            <Div
              rounded="xl"
              h={150}
              w={300}
              alignItems='center'

              bgImg={product.imageId}
            />
          </TouchableOpacity>
        </Div>
        <Div row>
          <Div flex={1} alignItems='flex-start'>
            <Text fontSize="md" mt={20} color="gray500">
              Date Added
            </Text>
          </Div>
          <Div flex={2} alignItems='center'>
            <Text fontSize="md" mt={20}>
              {product.createdAt}
            </Text>
          </Div>
          <Div flex={1} alignItems='flex-end' mr="sm">
            <Button mt="md" bg="#45A053" fontSize="md" rounded={17.5}>{newPrice}</Button>
          </Div>
        </Div>
      </Div>
    )
  })

  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.container}>
        <Div row>
          <Div
            flex={1}
            w="100%"
            h={150}
            alignItems='center'
            bgImg={ require("./Assets/store.jpg")}
          />
        </Div>
        <Div row>
          <Div flex={1} alignItems='flex-start' ml="lg">
            <Text fontSize="xl" fontWeight='bold' mt={20}>
              Address
            </Text>
          </Div>
          <Div flex={1} alignItems='flex-end' mr="lg">
            <Text fontSize="md" mt={20}>
              {shop.address}
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
          <Div flex={1} alignItems='flex-end' mt="sm" mr="xs">
            <Button mt="sm" bg="#45A053" color="gray100" fontSize="md" rounded={17.5}>Save shop &nbsp;<Icon name="star" color="gray100" /></Button>
          </Div>
        </Div>
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
          <Text fontWeight="bold" fontSize="4xl" mt="md" textAlign='center'>Newest Additions</Text>

          {renderProducts}

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

