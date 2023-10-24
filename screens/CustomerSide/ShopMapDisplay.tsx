import { View, ScrollView, TouchableOpacity, StyleSheet, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fireStore } from '../../config/firebase';
import { collection, getDocs, doc, getDoc, QuerySnapshot } from 'firebase/firestore';
import { Div, Button, Header, Icon, Text } from 'react-native-magnus';
import { MapDisplayHeader } from '../../components/headers/MapDisplayHeader';
import { CommonHeader } from '../../components/headers/CommonHeader';
import MapView from 'react-native-maps';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import getInitialState from "react-native-maps";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { locationObjectInterface, userSelectedCoordinateLocation } from '../../util/interfaces';
import * as Location from 'expo-location';
import LocationSelector from '../../components/LocationSelector';
import { getShops } from '../../util/dbFunctions';
import { shopDataInterface, LocationObj } from '../../util/interfaces';
import { getCoordDistance } from '../../util/geoCoordinateFunctions';


export default function ShopMapDisplay({ navigation }: any)
{
  const MAXDISTANCE = 2000;
  const [location, setLocation] = useState<Location.PermissionStatus>();
  const [errorMsg, setErrorMsg] = useState('');
  const [status, setStatus] = useState('');
  const [shopList, setShopList] = useState<shopDataInterface[] | undefined>();
  const [nearbyShops, setNearbyShops] = useState<shopDataInterface[] | undefined>();
  const [currentUserLocation, setCurrentUserLocation] = useState<LocationObj>();

  // defined the initial load location
  const [mapRegion, setmapRegion] = useState({
    latitude: 6.908767,
    longitude: 79.966993,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // updates when a user navigates to a new region
  const [userSelectedRegion, setUserSelectedRegion] = useState<locationObjectInterface>()
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>();
  const [calculatedDistancetest, setCalculatedDistancetest] = useState<number>();
  const [shopDistances, setShopDistances] = useState<number[]>([]);
  // data for userselected marker
  // const [userSelectedCoordinateLocation, setUserSelectedCoordinateLocation] = useState<userSelectedCoordinateLocation | locationObjectInterface>({
  const [userSelectedCoordinateLocation, setUserSelectedCoordinateLocation] = useState<locationObjectInterface>({
    latitude: currentUserLocation?.coords.latitude || 0,
    longitude: currentUserLocation?.coords.longitude || 0,
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

  useEffect(() =>
  {
    (async () =>
    {
      try
      {
        let { status } = await Location.requestForegroundPermissionsAsync();
        let currentLocation = await Location.getLastKnownPositionAsync();
        if (status !== 'granted')
        {
          setStatus('Permission to access location was denied');
          return;
        } else
        {
          console.log('Access granted!!')
          setStatus(status)
        }
        if (currentLocation)
        {
          setCurrentUserLocation(currentLocation);
        } else
        {
          console.log('current user location not found');
        }
        const latitude = currentUserLocation?.coords.latitude;
        const longitude = currentUserLocation?.coords.longitude;
        const firstShop = shopList?.[2];
        const coordinates: { latitude: number; longitude: number; } | undefined = firstShop?.coordinates;
        // const distance = getCoordDistance({ coord1: { latitude, longitude }, coord2: coordinates })
        const calculateDistances = async () =>
        {
          const distances = await Promise.all(
            shopList?.map((shop) =>
            {
              return getCoordDistance(
                {
                  coord1: {
                    latitude: currentUserLocation?.coords.latitude || 0,
                    longitude: currentUserLocation?.coords.longitude || 0,
                  },
                  coord2: shop.coordinates,
                }
              );
            }) || []
          );
          setShopDistances(distances);
        };
        calculateDistances();
        console.log(shopDistances);
        const nearbyShops = shopList?.filter((shop, index) => {
          return shopDistances[index] <= MAXDISTANCE;
        });
        setNearbyShops(nearbyShops);
        
      } catch (error)
      {
        console.log('Encountered an unknown error');

      }

    })();
  }, [shopList]);

  useEffect(() =>
  {
    const loader = async () =>
    {
      const shopListItems: shopDataInterface[] = await getShops();
      setShopList(shopListItems);
    }
    loader();
    console.log('here is the shopList', shopList);

  }, []);


  const watch_location = async () =>
  {
    if (status === 'granted')
    {
      let location = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 80,
        },
        (location_update) =>
        {
          console.log('update location!', location_update.coords);
        }
      );
    }
  };

  const key = ""
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
        key,
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
    console.log('current user location', currentUserLocation);
    console.log('NearBy shops', nearbyShops);

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
      <MapDisplayHeader navigation={navigation} />
      <Div style={styles.mapcontainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          loadingEnabled={true}
          showsScale={true}
          showsCompass={true}
          showsMyLocationButton={true}
          userLocationUpdateInterval={10000}
          followsUserLocation={true}

          initialRegion={mapRegion}
          onPress={userSelectedCoordinate}
          onRegionChangeComplete={handleRegionChange}
          onMarkerPress={handleMarkerPress}
        >
          {nearbyShops?.map((shop, index) => (
            <Marker
              key={index}
              style={styles.markerToolTip}
              coordinate={shop.coordinates}
              title={shop.shopName}
              description={shop.description}
              onPress={handleMarkerPress}
            >
              
            </Marker>
          ))}
        </MapView>
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
