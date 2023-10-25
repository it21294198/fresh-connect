import { doc, serverTimestamp, addDoc, collection, updateDoc, getDoc, getDocs, Timestamp, deleteDoc } from "firebase/firestore";
import { fireStore } from "../config/firebase";


// interfaces
export type Product = {
	id: string
	name: string,
	category: string,
	quantity: number,
	qtUnit: string,
	price: number,
	per: number,
	perUnit: string,
	organic: boolean,
	specialMsg: string,
	createdAt: Timestamp
}


// add new product 
export async function addNewProduct(product: Product, uid: string) {
	try {
		await addDoc(collection(fireStore, 'shops', uid, 'products'), {
			...product,
			createdAt: serverTimestamp()
		})
	} catch (error) {
		console.log('error adding new product: ', error);
	}
}

// read all product details
export async function fetchProducts(uid: string) {
	try {
		let productList: Array<Product> = [];
		const querySnapshot = await getDocs(collection(fireStore, 'shops', uid, 'products'))
		querySnapshot.forEach((doc) => {
			productList.push({
				...doc.data() as Product,
				id: doc.id
			});
		})
		return productList;
	} catch (error) {
		console.log('error fetching products: ', error);
		return[];
	}
}

// update product
export async function updateProduct(product: Product, uid:string) {
	try {
		await updateDoc(doc(fireStore, 'shops', uid, 'products', product.id), {
			...product
		})
	} catch (error) {
		console.log('error updating product: ', error);
	}
}

// delete product
export async function deleteProduct(uid: string, pid: string) {
	try {
		await deleteDoc(doc(fireStore, 'shops', uid, 'products', pid));	
	} catch (error) {
		console.log('error deleting product: ', error);
	}
}

// get catagories
export async function fetchCategories(): Promise<string[]> {
	try {
		const docSnap = await getDoc(doc(fireStore, 'categories', 'categories'));
		if (docSnap.exists()) {
			const data = docSnap.data();
			if (data && data.categories && Array.isArray(data.categories)) {
				return data.categories;
			}
		} 
		return [''];
	} catch (error) {
		console.log('error fetching categories: ', error);
		return [''];
	}
}