import { View, Text, ScrollView, TouchableOpacity, StyleSheet, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fireStore } from '../../config/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Div, Button, Header, Icon } from 'react-native-magnus';
import { MapDisplayHeader } from '../../components/headers/MapDisplayHeader';
import { CommonHeader } from '../../components/headers/CommonHeader';
import MapView from 'react-native-maps';

export default function ShopMapDisplay({ navigation }: any)
{

  const shopColRef = collection(fireStore, 'shops');


  return (
    <Div>
      <MapDisplayHeader navigation={navigation} />
      <Div>
        <MapView style={styles.container} />
      </Div>
    </Div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
