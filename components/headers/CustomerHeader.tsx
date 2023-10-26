import React from 'react'
import { Div, Button, Header, Icon } from 'react-native-magnus';
import customHamburger from "../../assets/customHamburger.png"
import infoIconEmpty from "../../assets/infoIconEmpty.png"
import LessThanBackArrow from '../../assets/LessThanBackArrow.png'
import { Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

/**
 * 
 * @param navigation - navigation object
 * @param title - Title to be shown in the middle 
 * @param headerRight - Boolean specifying whether to show a button to right side of header. False by default.
 * @remark If headerRight is true, displaye a info button by default. Change it however you want by importing an icon and adding it as "source"
 * @returns Custom Header component with Hamburger button, Title and Optional right side button
 */
export const CustomerHeader = ({ navigation, title, headerRight, back }: { navigation: any, title: string, headerRight: boolean, back:boolean }) =>
{
    const handleDrawer = () =>
    {
        navigation.toggleDrawer(); // Function to toggle the drawer
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white', height: 100, marginBottom:10 }}>
            <Header flex={1} flexDir='row'
                p="md"
                borderBottomWidth={1}
                borderBottomColor="gray200"
                alignment="center"
                textAlign='center'
                prefix={
                    back ? (
						<Button bg='transparent' color='black' rounded={30} onPress={() => navigation.goBack()} >
							<Image source={LessThanBackArrow} style={{ width: 15, height: 15, resizeMode: 'contain', marginVertical: 0 }} />
						</Button>
					) : (
						<Button bg="transparent" onPress={handleDrawer}>
							<Image source={customHamburger} style={{ width: 19, height: 21, resizeMode: 'contain' }} />
						</Button>
					)
                }
                suffix={headerRight ? <Button
                    bg='transparent'
                    color='black'
                    rounded={25}
                    prefix={
                        <Image source={infoIconEmpty} style={{ width: 20, height: 20, resizeMode: 'contain', marginVertical: 0 }} />
                    }
                /> : null}
            >
                {title}
            </Header>
        </SafeAreaView>

    )
}
