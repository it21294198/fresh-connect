import React from 'react'
import getDistance from 'geolib/es/getDistance';
import { coordComparisionObject } from './interfaces';

export const getCoordDistance = async (data: coordComparisionObject) => {
    const {coord1} = data;
    const {coord2} = data;
    const distanceInCoords = await getDistance(coord1, coord2)
    return distanceInCoords;
}

