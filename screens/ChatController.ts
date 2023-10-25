import { collection, addDoc, serverTimestamp, doc, updateDoc, getDocs, query, orderBy, getDoc, setDoc, deleteDoc, where } from 'firebase/firestore';
import {fireStore} from '../config/firebase'

async function sendMessage(msg:any){
    try{
        const docRef = await addDoc(collection(fireStore, "messages"), msg)

        const updateTimestamp = await updateDoc(docRef, {
            id:docRef.id,
            timestamp: serverTimestamp(),
        });

        console.log("Message Sent Successfully with ID: ", docRef.id)
    }catch(error){
        console.log("Error Sending Message: ",error)
    }
}

async function getMessages(roomId:string){
    const messages:any = [];
    try{
        const q = query(collection(fireStore,"messages"), where('chatRoom','==',roomId), orderBy("timestamp", "desc"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            messages.push(doc.data())
        });
        return messages
    }catch(error){
        console.log("Error Retrieving Messages: ",error)
    }
}

async function getChatRooms(id: string){
    const chatRooms:any = [];
    try{
        const q = query(collection(fireStore, "chatRooms"), where("participants", "array-contains", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            chatRooms.push(doc.data())
        });
        console.log(chatRooms)
        return chatRooms
    }catch(error){
        console.log("Error retrieving Chat Rooms: ",error)
    }
}

async function getUser(id:any){
    try{
        //console.log(id)
        const docRef = doc(fireStore,"users",id);
        const querySnapshot = await getDoc(docRef);
        if(querySnapshot.exists()){
            const newData = querySnapshot.data()
            return newData.firstName
        }else{
            console.log("No such user")
        }
    }catch(error){
        console.log("Error getting user by id",error)
    }
}

export {sendMessage, getMessages, getUser, getChatRooms}