import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FarmerHeader } from '../../components/headers/FarmerHeader';

export default function FarmerShopPage() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  
  return (
    <View style={{
			paddingTop: insets.top,
			paddingBottom: insets.bottom,
			paddingLeft: insets.left,
			paddingRight: insets.right
		}}>
			<StatusBar backgroundColor="white" barStyle="dark-content" />
			<FarmerHeader navigation={navigation} title="Farmer's shop" headerRight={false} back={false} />
			
      <Text>FarmerShopPage</Text>
    </View>
  )
}