import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Input, Icon, Button, Div, Text, Header, Image } from "react-native-magnus";

interface ShopData {
    id: string;
    text: string;
  }

export default function CustomerShopPage({ route, navigation }: any) {
    const [data, setData] = useState<ShopData[]>([]);

    const products =[
    {
        name: 'Carrot',
        category:'Vegetables',
        price: 1000,
        organic: true
    },
    {
        name: 'Mango',
        category:'Fruits',
        price: 1000,
        organic: true
    },
    {
        name: 'Milk',
        category:'Dairy',
        price: 1000,
        organic: true
    }
    ]

    const renderProducts = products.map((product) => {
        return (
          <Div m="sm" rounded="md" shadow='sm' p="md">
            <Div row alignItems="center">
              <Div flex={1}>
                <Text fontWeight="bold" fontSize="xl" mt="sm">
                  {product.name}
                </Text>
              </Div>
              <Image h={50} w={50} source={require("./Assets/organic.png")} />
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
                  {product.price}
                </Text>
              </Div>
            </Div>
            <Div row flex={1}>
              <Button alignItems='flex-end' onPress={() => navigation.navigate('CustomerShopPage', { product:product })}>View</Button>
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

