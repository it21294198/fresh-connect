import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Input, Icon, Button, Div, Text, Header, Image } from "react-native-magnus";

export default function CustomerProductPage({ route, navigation }: any) {
    const { product } = route.params

    return (
        <ScrollView style={styles.scrollview}>
            <View style={styles.container}>
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
                    <Div row flex={1}>
                        <Div>
                            <Text fontSize="xl" m="sm">
                                {product.price}
                            </Text>
                        </Div>
                        <Button alignItems='flex-end'>View</Button>
                    </Div>
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



