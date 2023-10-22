import { View, Text, ScrollView } from 'react-native';
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


export default function ShopMapDisplay({navigation})
{

  const shopColRef = collection(fireStore, 'shops');


  return (
    <MapDisplayHeader navigation={navigation}/>
  );
}
