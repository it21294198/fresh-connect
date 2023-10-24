import React from "react";
import * as Location from "expo-location";
import { getShops } from "./dbFunctions";

export const getMarkers = () => {};

export function getAddressFromCoordinates({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<string | undefined> {
  const key = "";
  return new Promise((resolve, reject) => {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        latitude +
        "," +
        longitude +
        "&key=" +
        key
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "OK") {
          resolve(responseJson?.results?.[0]?.formatted_address);
        } else {
          reject("not found");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const watch_location = async () => {
  if (status === "granted") {
    let location = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 10000,
        distanceInterval: 80,
      },
      (location_update) => {
        console.log("update location!", location_update.coords);
      }
    );
  }
};

export const getMarkersIDFromCollection = async () => {
  const shops = await getShops();
  const markersArray = shops.docs.map((shop, index) => {
    return shop.id;
  });
  return markersArray;
};

