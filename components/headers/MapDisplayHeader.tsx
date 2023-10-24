import React from 'react'
import { Div, Button, Header, Icon, Text } from 'react-native-magnus';
import customHamburger from "../../assets/customHamburger.png"
import searchIcon from "../../assets/searchIcon.png"
import { NavigationProp } from '@react-navigation/native';
import { Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export const MapDisplayHeader = ({ navigation }: any) =>
{
    const handleDrawer = () =>
    {
        navigation.toggleDrawer(); // Function to toggle the drawer
    };
    const text = "Search"
    return (
        <>
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                <Div>
                    <Div >
                        <Header flexDir='row'
                            p="lg"
                            borderBottomWidth={1}
                            borderBottomColor="gray200"
                            alignment="center"
                            shadow={0}
                            prefix={
                                <Button bg="transparent" onPress={handleDrawer}
                                    prefix={
                                        <Image source={customHamburger} style={{ width: 19, height: 21, resizeMode: 'contain', }} />
                                    }>
                                </Button>
                            }>
                            <Button
                                borderColor='black'
                                borderWidth={1}
                                alignSelf='center'
                                bg='transparent'
                                color='black'
                                rounded={25}
                                w={200}
                                prefix={<Image source={searchIcon} style={{ width: 19, height: 20, resizeMode: 'contain', paddingHorizontal: 20 }}></Image>}
                            >Search</Button>
                        </Header>
                    </Div>
                </Div>
            </SafeAreaView>
        </>
    )
}