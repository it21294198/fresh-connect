import React, { useEffect, useState } from 'react'
import { Avatar, Button, Div, Text } from 'react-native-magnus'
import { useNavigation } from '@react-navigation/native';
import { UserLogin, drawerProfileInterface } from '../util/interfaces';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { GestureResponderEvent } from 'react-native';
import { useSelector } from 'react-redux';

export const DrawerProfile = () =>
{
    const navigation = useNavigation();

    const [userData, setUserData] = useState<UserLogin>();

    let uId: string | null | undefined = useSelector((state: { user: UserLogin }) => state.user.userId)
    let email: string | null = useSelector((state: { user: UserLogin }) => state.user.email)
    let userType: boolean | null = useSelector((state: { user: UserLogin }) => state.user.type)
    let firstName: string | null | undefined = useSelector((state: { user: UserLogin }) => state.user.firstName)
    let lastName: string | null | undefined = useSelector((state: { user: UserLogin }) => state.user.lastName)
    let user: UserLogin = useSelector((state: { user: UserLogin }) => state.user)

    const navigateToCustomerProfile = (event: GestureResponderEvent) =>
    {
        navigation.navigate('CustomerProfile' as never);
    };

    return (
        <Div alignItems='center' justifyContent='center'>
            <TouchableOpacity onPress={navigateToCustomerProfile}>
                <Div flexDir='row' alignItems='center' mx="xl" my="2xl">
                    <Avatar bg="red300" color="red800">A</Avatar>
                    <Div flexDir='column'>
                        <Text px="xl">{user?.firstName} {user?.lastName}</Text>
                        <Text px="xl">{user?.email}</Text>
                    </Div>
                </Div>
            </TouchableOpacity>
        </Div>
    )
}


