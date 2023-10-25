import { StyleSheet, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Div, Button, Header, Icon, Text, Dropdown, DropdownRef } from 'react-native-magnus';
import { MapDisplayHeader } from '../../components/headers/MapDisplayHeader';
import MapView from 'react-native-maps';
import { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { locationObjectInterface, userSelectedCoordinateLocation } from '../../util/interfaces';
import * as Location from 'expo-location';
import { getShops } from '../../util/dbFunctions';
import { shopDataInterface, LocationObj } from '../../util/interfaces';
import { getCoordDistance } from '../../util/geoCoordinateFunctions';

export default function ShopMapDisplay({ navigation }: any)
{
  const [MAXDISTANCE, setMAXDISTANCE] = useState<number>(5000);
  const [status, setStatus] = useState('');
  const [shopList, setShopList] = useState<shopDataInterface[] | undefined>();
  const [nearbyShops, setNearbyShops] = useState<shopDataInterface[] | undefined>();
  const [currentUserLocation, setCurrentUserLocation] = useState<LocationObj>();
  const [isLoading, setIsLoading] = useState(true);

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
  // data for userselected marker
  // const [userSelectedCoordinateLocation, setUserSelectedCoordinateLocation] = useState<userSelectedCoordinateLocation | locationObjectInterface>({
  const [userSelectedCoordinateLocation, setUserSelectedCoordinateLocation] = useState<locationObjectInterface>({
    latitude: currentUserLocation?.coords.latitude || 0,
    longitude: currentUserLocation?.coords.longitude || 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const dropdownRef = React.createRef();
  useEffect(() =>
  {
    (async () =>
    {
      try
      {
        let distancesArry: number[] = [];
        if (currentUserLocation)
        {
          const latitude = currentUserLocation?.coords.latitude;
          const longitude = currentUserLocation?.coords.longitude;
          const firstShop = shopList?.[2];
          // const coordinates: { latitude: number; longitude: number; } | undefined = firstShop?.coordinates;
          const distances = await Promise.all(
            shopList?.map((shop) =>
            {
              let shopLatLng = { latitude: shop.shopAddress.latitude, longitude: shop.shopAddress.longitude };
              return getCoordDistance(
                {
                  coord1: {
                    latitude: currentUserLocation!.coords.latitude,
                    longitude: currentUserLocation!.coords.longitude,
                  },
                  coord2: shop.shopAddress,
                }
              );
            }) || []
          );
          distancesArry = distances as number[];
          console.log('All Shop distances from current user location ', distancesArry);

          const nearbyShops = shopList?.filter((shop, index) =>
          {
            return distancesArry[index] <= MAXDISTANCE;
          });
          setNearbyShops(nearbyShops);
        }
      } catch (error)
      {
        console.log('Encountered an unknown error', error);
      }

    })();
  }, [shopList, currentUserLocation, MAXDISTANCE]);

  useEffect(() =>
  {
    const loader = async () =>
    {

      const shopListItems: shopDataInterface[] = await getShops();
      setShopList(shopListItems);
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
        setIsLoading(false);
      } else
      {
        console.log('current user location not found');
        setIsLoading(false);

      }
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
  }

  const handleMarkerPress = (index: number) =>
  {
    const selectedShop: shopDataInterface | undefined = nearbyShops?.[index];
    console.log('called handleMarkerPress: ', selectedShop?.shopId);
    navigation.navigate('CustomerShopPage', { shopId: selectedShop?.shopId });
  }

  // const userSelectedCoordinate = async (data: any) =>
  // {
  //   const { coordinate }: {
  //     coordinate: {
  //       latitude: number,
  //       longitude: number
  //     }
  //   } = data.nativeEvent;
  //   console.log('current user location', currentUserLocation);
  //   console.log('NearBy shops', nearbyShops);
  //   setUserSelectedCoordinateLocation((previousState) => ({
  //     ...previousState,
  //     latitude: coordinate.latitude,
  //     longitude: coordinate.longitude,
  //   }));
  //   const addressString = await getAddressFromCoordinates(coordinate);
  //   setSelectedAddress(addressString)
  // }

  const handleRangeSelect = (range: number) =>
  {
    console.log('Called handleRangeSelect with value', range);
    setMAXDISTANCE(range);
  }

  return (
    <Div style={styles.container}>
      <MapDisplayHeader navigation={navigation} />
      <Div style={styles.mapcontainer}>
        {isLoading ? <Div><Text>Loading ...</Text></Div> : <MapView
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
          onRegionChangeComplete={handleRegionChange}
          onMarkerPress={handleMarkerPress}
        >
          {nearbyShops?.map((shop, index) => (
            <Marker
              key={index}
              style={styles.markerToolTip}
              coordinate={shop.shopAddress}
              title={shop.shopName}
              description={shop.description}
              onPress={(event) => handleMarkerPress(index)} >
            </Marker>
          ))}
          <Circle
            center={{ latitude: currentUserLocation?.coords.latitude as number, longitude: currentUserLocation?.coords.longitude as number }}
            radius={MAXDISTANCE}
            strokeWidth={4}
            strokeColor='rgba(150, 211, 159, 0.1)'
            fillColor='rgba(150, 211, 159, 0.3)'
          />
        </MapView>}

      </Div>
      <Dropdown
        ref={dropdownRef}
        title={
          <Text mx="xl" color="gray500" pb="md">
            Select a range (Km)
          </Text>
        }
        mt="md"
        pb="2xl"
        showSwipeIndicator={true}
        roundedTop="xl">
        <Dropdown.Option value='5000' py="md" px="xl" block onPress={() => handleRangeSelect(5000)}>
          5Km
        </Dropdown.Option>
        <Dropdown.Option value='10000' py="md" px="xl" block onPress={() => handleRangeSelect(10000)}>
          10Km
        </Dropdown.Option>
        <Dropdown.Option value='20000' py="md" px="xl" block onPress={() => handleRangeSelect(20000)}>
          20Km
        </Dropdown.Option>
        <Dropdown.Option value='50000' py="md" px="xl" block onPress={() => handleRangeSelect(85000)}>
          50Km
        </Dropdown.Option>
      </Dropdown>
      <Text
        fontSize="sm"
        color='#9D9D9D'
        textAlign='center'
      >Showing shops in a {MAXDISTANCE / 1000.0}Km radius</Text>
      <Button
        block
        bg="#45A053"
        mt="sm"
        rounded={30}
        p="md"
        mx="md"
        color="white"
        onPress={() => dropdownRef.current.open()}>
        Select Distance
      </Button>
    </Div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
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
