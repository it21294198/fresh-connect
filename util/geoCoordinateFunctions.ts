import React from 'react'
import getDistance from 'geolib/es/getDistance';
import { coordComparisionObject } from './interfaces';
import { GeolibInputCoordinates } from 'geolib/es/types';


export const getCoordDistance = async (data: coordComparisionObject) => {
    try {
        
        const {coord1} = data;
        const {coord2} = data;
        const distanceInCoords = await getDistance(coord1 as GeolibInputCoordinates, coord2 as GeolibInputCoordinates)
        return distanceInCoords;
    } catch (error) {
        console.log('Called getCoordDistance with error', error);
        
    }
}

