import React from 'react'
import { Avatar, Button, Div, Text } from 'react-native-magnus'
import { useNavigation } from '@react-navigation/native';
import { drawerProfileInterface } from '../util/interfaces';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { GestureResponderEvent } from 'react-native';

export const DrawerProfile = () =>
{
    const navigation = useNavigation();

    const navigateToCustomerProfile = (event: GestureResponderEvent) =>
    {
        navigation.navigate('CustomerProfile' as never);
    };

    return (
        <Div alignItems='center' justifyContent='center'>
            <TouchableOpacity onPress={navigateToCustomerProfile}>
                <Div flexDir='row' alignItems='center' mx="xl"  my="2xl">
                    <Avatar bg="red300" color="red800">A</Avatar>
                    <Text px="xl">TODO: Add current user username or email</Text>
                </Div>
            </TouchableOpacity>
        </Div>
    )
}


