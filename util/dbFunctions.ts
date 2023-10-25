import { collection, getDocs, query } from "firebase/firestore"
import { fireStore } from "../config/firebase"
import { shopDataInterface } from "./interfaces";

// collection references
const shopsColRef = collection(fireStore, 'shops');
const geoCodeColRef = collection(fireStore, 'mapGeoCodeTestCollection');

export const getShops = async () => {
    const shopsSnapshot = await getDocs(shopsColRef);
    const shops= shopsSnapshot.docs.map((doc) => ({...doc.data(), shopId: doc.id}) as shopDataInterface);
    // const shops= shopsSnapshot.docs.map((doc) => doc.data() as shopDataInterface);
    console.log('Called getShops in dbFunctions', shops);
    return shops;
}