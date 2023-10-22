import React from 'react'
import { Div, Button, Header, Icon } from 'react-native-magnus';
import customHamburger from "../../assets/customHamburger.png"
import searchIcon from "../../assets/searchIcon.png"
import { NavigationProp } from '@react-navigation/native';
import { Image } from 'react-native';

export const MapDisplayHeader = ({ navigation }: any) =>
{
    const handleDrawer = () =>
    {
        navigation.toggleDrawer(); // Function to toggle the drawer
    };

    return (
        <>
            <Div>
                <Div >
                    <Header flex={1} flexDir='row'
                        p="lg"
                        borderBottomWidth={1}
                        borderBottomColor="gray200"
                        alignment="center"
                        prefix={
                            <Button bg="transparent" onPress={handleDrawer}
                                prefix={
                                    <Image source={customHamburger} style={{ width: 19, height: 21, resizeMode: 'contain', }} />
                                }>
                            </Button>
                        }> <Button
                            borderColor='black' 
                            borderWidth={1} 
                            bg='transparent' 
                            color='black' 
                            alignSelf="center"
                            style={{marginHorizontal: 50, paddingVertical:0, marginVertical:0}}
                            rounded={25}
                            prefix={
                                <Image source={searchIcon} style={{ width: 19, height: 21, resizeMode: 'contain', paddingHorizontal:20, marginVertical:0 }} />
                            }
                            >Search</Button>
                    </Header>
                </Div>
            </Div>
        </>
    )
}
