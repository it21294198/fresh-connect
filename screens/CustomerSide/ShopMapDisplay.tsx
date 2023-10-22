import { View, Text, ScrollView,} from 'react-native';
import React, { useState, useEffect } from 'react';
import { fireStore } from '../../config/firebase';
import
{
  collection,
  getDocs,
  doc,
  getDoc
} from 'firebase/firestore';
import { Div, Button, Header, Icon } from 'react-native-magnus';
import { MapDisplayHeader } from '../../components/headers/MapDisplayHeader';
import { CommonHeader } from '../../components/headers/CommonHeader';



export default function ShopMapDisplay({ navigation })
{

  const shopColRef = collection(fireStore, 'shops');


  return (
    <Div>
      {/* <MapDisplayHeader navigation={navigation} /> */}
      <CommonHeader navigation={navigation} title='lorem ipsum dollar lament' headerRight={false} />
    </Div>
  );
}
