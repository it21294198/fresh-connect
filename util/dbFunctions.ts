import { DocumentData, QuerySnapshot, collection, getDocs, query } from "firebase/firestore"
import { fireStore } from "../config/firebase"
import { faqInterface, shopDataInterface } from "./interfaces";

// collection references
const shopsColRef = collection(fireStore, 'shops');
const geoCodeColRef = collection(fireStore, 'mapGeoCodeTestCollection');
const faQColRef = collection(fireStore, 'faq');

export const getShops = async () => {
    const shopsSnapshot = await getDocs(shopsColRef);
    const shops= shopsSnapshot.docs.map((doc) => ({...doc.data(), shopId: doc.id}) as shopDataInterface);
    // const shops= shopsSnapshot.docs.map((doc) => doc.data() as shopDataInterface);
    console.log('Called getShops in dbFunctions', shops);
    return shops;
}

export const getFaqs = async () =>{
    const faqItemsSnapshot = await getDocs(faQColRef);
    return faqItemsSnapshot;
}