import { View, ScrollView, TouchableOpacity, StyleSheet, Animated, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fireStore } from '../config/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Div, Button, Header, Icon, Text } from 'react-native-magnus';
import { MapDisplayHeader } from '../components/headers/MapDisplayHeader';
import { CommonHeader } from '../components/headers/CommonHeader';
import MapView from 'react-native-maps';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import getInitialState from "react-native-maps";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { locationObjectInterface, userSelectedCoordinateLocation } from '../util/interfaces';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function LocationSelector({ navigation, handleConfirm }: { navigation: any, handleConfirm: (coordinates: locationObjectInterface, selectedAddress: string | undefined) => void })
{
  console.log(GOOGLE_MAPS_API_KEY);
  const shopColRef = collection(fireStore, 'shops');

  const [location, setLocation] = useState<Location.PermissionStatus>();
  const [errorMsg, setErrorMsg] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() =>
  {
    (async () =>
    {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted')
      {
        setStatus('Permission to access location was denied');
        return;
      } else
      {
        console.log('Access granted!!')
        setStatus(status)
      }

    })();
  }, []);

  // defined the initial load location
  const [mapRegion, setmapRegion] = useState({
    latitude: 7.290572,
    longitude: 80.633728,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // updates when a user navigates to a new region
  const [userSelectedRegion, setUserSelectedRegion] = useState<locationObjectInterface>()
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>();
  // data for userselected marker
  // const [userSelectedCoordinateLocation, setUserSelectedCoordinateLocation] = useState<userSelectedCoordinateLocation | locationObjectInterface>({
  const [userSelectedCoordinateLocation, setUserSelectedCoordinateLocation] = useState<locationObjectInterface>({
    latitude: 7.290572,
    longitude: 80.633728,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // marker coordinates
  const [selectedRegion, setSelectedRegion] = useState({
    latitude: 7.290572,
    longitude: 80.633728,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const myApiKey = "AIzaSyD1zXbosA4kkCMF7LhfD3Xw0IQotezwHHM"
  function getAddressFromCoordinates({ latitude, longitude }: { latitude: number, longitude: number }): Promise<string | undefined>
  {
    return new Promise((resolve, reject) =>
    {
      fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        latitude +
        ',' +
        longitude +
        '&key=' +
        myApiKey,
      )
        .then(response => response.json())
        .then(responseJson =>
        {
          if (responseJson.status === 'OK')
          {
            resolve(responseJson?.results?.[0]?.formatted_address);
          } else
          {
            reject('not found');
          }
        })
        .catch(error =>
        {
          reject(error);
        });
    });
  }

  const handleRegionChange = (data: locationObjectInterface) =>
  {
    setUserSelectedRegion(data)
    console.log('Called handleRegionChange: ', data);

  }

  const handleLocationDrag = async (event: any) =>
  {
    setSelectedRegion(event);
    setUserSelectedCoordinateLocation((previousState) => ({
      ...previousState,
      latitude: event.latitude,
      longitude: event.longitude,
    }));
    const addressString = await getAddressFromCoordinates(event);
    setSelectedAddress(addressString)
    console.log('Address from map on drag (through handleLocationDrag)', addressString);

    console.log('called handleLocationDrag: ', event);
  }

  const handleMarkerPress = (event: any) =>
  {
    console.log('called handleMarkerPress: ', event);
  }

  const userSelectedCoordinate = async (data: any) =>
  {
    const { coordinate }: {
      coordinate: {
        latitude: number,
        longitude: number
      }
    } = data.nativeEvent;


    setUserSelectedCoordinateLocation((previousState) => ({
      ...previousState,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    }));
    const addressString = await getAddressFromCoordinates(coordinate);
    setSelectedAddress(addressString)
    console.log('Address from map on press (through setUserSelectedCoordinateLocation)', addressString);

    setTimeout(() =>
    {
      console.log(userSelectedCoordinateLocation);
    }, 5000);
  }

  const handlePressConfirm = (coordinates: locationObjectInterface, selectedAddress: string | undefined) =>
  {
    console.log('handlePressConfirm called ########');

  }

  return (
    <Div style={styles.container}>
        {/* <GooglePlacesAutocomplete

          placeholder='Search'
          onPress={(data, details = null) =>
          {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: 'YOUR API KEY',
            language: 'en',
          }}
        /> */}
      <Div style={styles.mapcontainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          loadingEnabled={true}
          initialRegion={mapRegion}
          onPress={userSelectedCoordinate}
          onRegionChangeComplete={handleRegionChange}
          onMarkerPress={handleMarkerPress}
        >
          <Marker
            style={styles.markerToolTip}
            coordinate={userSelectedCoordinateLocation}
            title='Your shop address'
            description='lorem ipsum dollar lament lol lmfao why wwhen who then react next js sample test'
            draggable
            onDragEnd={(e) => handleLocationDrag(e.nativeEvent.coordinate)}
          >
          </Marker>
        </MapView>
      </Div>
      <Div style={styles.actioncard}>
        <Text
          fontSize="sm"
          color='#9D9D9D'
          mt={10}
          ml={15}
        >Your Location</Text>
        <Text
          fontSize="sm"
          color='#343434'
          mt={10}
          ml={15}>{selectedAddress ? <Text> {selectedAddress}</Text> : 'Fetching location...'}</Text>
        <Button
          alignSelf='center'
          w='90%'
          rounded={8}
          bg='#45A053'
          mt={20}
          mb={15}
          onPress={() => handleConfirm(userSelectedCoordinateLocation, selectedAddress)}
        >Confirm</Button>
      </Div>
    </Div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: 'auto',
    flex: 1,
    borderWidth: 2,
    borderColor: 'black'
  },
  mapcontainer: {
    flex: 1,
    padding: 5,
    height: '50%'
  },
  actioncard: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    height: 'auto',
    flexDirection: 'column',
  },
  label: {
    fontSize: 10,
  },
  markerToolTip: {
    maxWidth: 60,
    width: 50,
    height: 50,
  }
});
