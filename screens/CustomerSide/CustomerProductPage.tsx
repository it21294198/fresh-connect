import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fireStore } from '../../config/firebase'
import { collection, addDoc, serverTimestamp, updateDoc, getDocs, query, where } from 'firebase/firestore';
import { Input, Icon, Button, Div, Text, Header, Image } from "react-native-magnus";
import { getUser } from '../ChatController';
import { useDispatch } from 'react-redux';
import { loaderSlice, setLoadingFalse, setLoadingTrue } from '../../features/connection/loaderSlice';

export default function CustomerProductPage({ route, navigation }: any) {
    const { user, shop, product } = route.params
    const newPrice = "Rs " + product.price + " per " + product.per + product.qtUnit;
    const dispatch = useDispatch()
    

    async function navigateChat() {
        //const participants = [user.id,shop.userId]
        try {
            //Find the chat room where users are at
            dispatch(setLoadingTrue());
            const userChatRoomsQuery = query(collection(fireStore, "chatRooms"), where("participants", "array-contains", user.id));
            const shopChatRoomsQuery = query(collection(fireStore, "chatRooms"), where("participants", "array-contains", shop.userId));

            const userChatRoomsSnapshot = await getDocs(userChatRoomsQuery);
            const shopChatRoomsSnapshot = await getDocs(shopChatRoomsQuery);

            const userChatRooms:any = [];
            const shopChatRooms:any = [];

            //Get the chat room id of the chat rooms the user is at
            userChatRoomsSnapshot.forEach((doc) => {
                userChatRooms.push(doc.id);
            });

            shopChatRoomsSnapshot.forEach((doc) => {
                shopChatRooms.push(doc.id);
            });

            // Find chat rooms that both users share
            const commonChatRooms = userChatRooms.filter((roomId:string) => shopChatRooms.includes(roomId));
            //console.log(commonChatRooms)

            const userName = await getUser(user.id)
            const shopUserName = await getUser(shop.userId)
            const chatName = userName + " chat with " + shopUserName

            // const querySnapshot = await getDocs(q);
            if (!(commonChatRooms.length===0)) {
                console.log("Chat Room Available")
                const chatRoomId = commonChatRooms[0];
                dispatch(setLoadingFalse());
                navigation.navigate('Chat', { user: user, chatRoom: chatRoomId });
            } else {
                console.log("Chat Room Not Available so creating one")
                const newChatRoomRef = await addDoc(collection(fireStore, "chatRooms"), {
                    participants: [user.id, shop.userId],
                    name: chatName,
                })
                const updateTimestamp = await updateDoc(newChatRoomRef, {
                    id: newChatRoomRef.id,
                    timestamp: serverTimestamp(),
                });
                dispatch(setLoadingFalse());
                navigation.navigate('Chat', { user: user, chatRoom: newChatRoomRef.id });
            }
        } catch (error) {
            console.log("Error Navigating: ", error)
        }      
    }

    return (
        <ScrollView style={styles.scrollview}>
            <View style={styles.container}>
                <Div m="sm" rounded={10} shadow='sm' p={10} bg='white'>
                    <Div row>
                        <Div
                            rounded="xl"
                            flex={1}
                            h={150}
                            w="100%"
                            mb="md"
                            alignItems='center'
                            bgImg={product.imageId}
                        />
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
                        <Div flex={1} alignItems='flex-start' ml="lg">
                            <Text fontSize="md" color="gray500" mt={20}>
                                Date Added
                            </Text>
                        </Div>
                        <Div flex={1} alignItems='flex-end' mr="lg">
                            <Text fontSize="md" mt={20}>
                                {product.createdAt}
                            </Text>
                        </Div>
                    </Div>
                    <Div row>
                        <Div flex={1} alignItems='flex-start' ml="lg">
                            <Text fontSize="md" color="gray500" mt="lg">
                                Price
                            </Text>
                        </Div>
                        <Div flex={1} alignItems='flex-end' mr="lg">
                            <Text fontSize="md" mt="lg">
                                {newPrice}
                            </Text>
                        </Div>
                    </Div>
                    <Div row>
                        <Div flex={1} alignItems='flex-start' ml="lg">
                            <Text fontSize="md" color="gray500" mt="lg">
                                Quantity Remaining
                            </Text>
                        </Div>
                        <Div flex={1} alignItems='flex-end' mr="lg">
                            <Text fontSize="md" mt="lg">
                                {product.quantity}
                            </Text>
                        </Div>
                    </Div>
                    <Div row>
                        <Div flex={1} alignItems='flex-start' ml="lg">
                            <Text fontSize="md" color="gray500" mt="lg">
                                Buy Before
                            </Text>
                        </Div>
                        <Div flex={1} alignItems='flex-end' mr="lg">
                            <Text fontSize="md" mt="lg">
                                {product.buyBefore}
                            </Text>
                        </Div>
                    </Div>
                    <Div row>
                        <Div flex={1} alignItems='flex-start' ml="lg">
                            <Text fontSize="md" color="gray500" mt="lg">
                                Notes from seller
                            </Text>
                        </Div>
                    </Div>
                    <Div row>
                        <Div flex={1} alignItems='flex-start' ml="lg">
                            <Text fontSize="md" mt="lg">
                                {product.specialMsg}
                            </Text>
                        </Div>
                    </Div>
                    <Div row flex={1} justifyContent='center'>
                        <Div mx="lg">
                            <Button w={131} h={35} mt="md" bg="#45A053" fontSize="md" rounded={17.5} onPress={() => navigateChat()}>Chat</Button>
                        </Div>
                        <Div mx="lg">
                            <Button w={131} h={35} mt="md" bg="#45A053" fontSize="md" rounded={17.5}>Contact</Button>
                        </Div>
                    </Div>
                    <Div row flex={1} justifyContent='center'>
                        <Button w={131} h={35} mt="md" bg="white" borderWidth={1} borderColor="#45A053" color="#45A053" underlayColor="red100" fontSize="md" rounded={17.5}>Price Calculator</Button>
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



