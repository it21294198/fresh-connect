import { collection, addDoc, serverTimestamp, doc, updateDoc, getDocs, query, orderBy, getDoc, setDoc, deleteDoc, where } from 'firebase/firestore';
import {fireStore} from '../../config/firebase'

async function getShops(id: string){
    const shops:any = [];
    try{
        const shopsCollectionRef = collection(fireStore,"shops")
        //const shopsRef = doc(shopsCollectionRef,id)
        //const productRef = collection(shopsRef,"products")

        const querySnapshot = await getDocs(shopsCollectionRef)
        querySnapshot.forEach((doc)=>{
            shops.push(doc.data())
        })
        return shops
    }catch(error){
        console.log("Error retrieving shops: ",error)
    }
}

async function getProducts(id: string){
    const products:any = [];
    try{
        const shopsCollectionRef = collection(fireStore,"shops")
        const shopsRef = doc(shopsCollectionRef,id)
        const productRef = collection(shopsRef,"products")

        const querySnapshot = await getDocs(productRef)
        querySnapshot.forEach((doc)=>{
            products.push(doc.data())
        })
        return products
    }catch(error){
        console.log("Error retrieving products: ",error)
    }
}

export {getShops, getProducts}