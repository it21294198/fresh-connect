import React from 'react'
import LocationSelector from '../../components/LocationSelector'
import { Div, Text } from 'react-native-magnus'
import { CommonHeader } from '../../components/headers/CommonHeader'
import { locationObjectInterface } from '../../util/interfaces'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export const TestFile = ({ navigation }: any) =>
{
    const handleConfirmPress = (coordinates: locationObjectInterface, selectedAddress: string | undefined) =>
    {
        console.log('Called handleConfirmPress from LocationSelector child in test.tsx');
        console.log('here is address object', selectedAddress);
        console.log('here is coordinates object', coordinates);

    }
    return (
        <>
            <Div style={{flex:1, flexDirection: 'column'}}>
                <SafeAreaView style={{ height: 'auto' }}>
                    <CommonHeader navigation={navigation} title='Test page' headerRight={false} />
                </SafeAreaView>
                    <LocationSelector navigation={navigation} handleConfirm={handleConfirmPress} />

            </Div>
        </>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%'
    },
});