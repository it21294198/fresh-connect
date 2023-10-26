import { collection, addDoc, serverTimestamp, doc, updateDoc, getDocs, query, orderBy, getDoc, setDoc, deleteDoc, where, arrayUnion } from 'firebase/firestore';
import {fireStore} from '../../config/firebase'

async function getShops(){
    const shops:any = [];
    try{
        const shopsCollectionRef = collection(fireStore,"shops")
        const querySnapshot = await getDocs(shopsCollectionRef)
        querySnapshot.forEach((doc)=>{
            shops.push(doc.data())
        })
        return shops
    }catch(error){
        console.log("Error retrieving shops: ",error)
    }
}

async function getSavedShops(id: string){
    try{
        const q = doc(fireStore,"users",id)
        const querySnapshot = await getDoc(q)
        if(querySnapshot.exists()){
            const savedShops = querySnapshot.data().savedShops
            return savedShops
        }else{
            console.log("No any shop found")
        }
    }catch(error){
        console.log("Error retrieving shops: ",error)
    }
}

async function getShopById(id: string){
    try{
        const docRef = doc(fireStore,"shops",id);
        const querySnapshot = await getDoc(docRef);
        if(querySnapshot.exists()){
            return querySnapshot.data()
        }else{
            console.log("No any shop found")
        }
    }catch(error){
        console.log("Error getting shop by id: ",error)
    }
}

async function saveShop(id: string, data:string){
    try{
        const docRef = doc(fireStore,"users",id);
        await updateDoc(docRef, {
            savedShops: arrayUnion(data)
        });
    }catch(error){
        console.log("Error saving shop ",error)
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

export {getShops, getProducts, getShopById, getSavedShops, saveShop}