import React from 'react'
import { Div, Button, Header, Icon } from 'react-native-magnus';
import customHamburger from "../../assets/customHamburger.png"
import infoIconEmpty from "../../assets/infoIconEmpty.png"
import { Image } from 'react-native';

/**
 * 
 * @param navigation - navigation object
 * @param title - Title to be shown in the middle 
 * @param headerRight - Boolean specifying whether to show a button to right side of header. False by default.
 * @remark If headerRight is true, displaye a info button by default. Change it however you want by importing an icon and adding it as "source"
 * @returns Custom Header component with Hamburger button, Title and Optional right side button
 */
export const CommonHeader = ({ navigation, title, headerRight }: { navigation: any, title: string, headerRight: boolean }) =>
{
    const handleDrawer = () =>
    {
        navigation.toggleDrawer(); // Function to toggle the drawer
    };

    return (
            <Div>
                <Div >
                    <Header flex={1} flexDir='row'
                        p="lg"
                        borderBottomWidth={1}
                        borderBottomColor="gray200"
                        alignment="center"
                        textAlign='center'
                        prefix={
                            <Button bg="transparent" onPress={handleDrawer}
                                prefix={
                                    <Image source={customHamburger} style={{ width: 19, height: 21, resizeMode: 'contain' }} />
                                }>
                            </Button>
                        }
                        suffix={headerRight? <Button
                            bg='transparent'
                            color='black'
                            rounded={25}
                            prefix={
                                <Image source={infoIconEmpty} style={{ width: 20, height: 20, resizeMode: 'contain', marginVertical: 0 }} />
                            }
                        />: null}
                    >
                        {title}
                    </Header>
                </Div>
            </Div>

    )
}
