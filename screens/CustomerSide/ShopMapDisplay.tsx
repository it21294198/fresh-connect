import { View, Text, ScrollView, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fireStore } from '../../config/firebase';
import {
  collection,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
  doc,
  deleteDoc,
} from 'firebase/firestore';

interface ShopData {
  id: string;
  text: string;
  // Add other fields as needed
}

export default function ShopMapDisplay() {
  const [data, setData] = useState<ShopData[]>([]);

  useEffect(() => {
    fetchDataFromFirestore();
  }, []);

  const fetchDataFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(fireStore, 'text'));
      const items: any = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          ...doc.data(),
        })
      );
      setData(items);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleDelete = async (itemId: string) => {
    try {
      await deleteDoc(doc(fireStore, 'text', itemId));
      fetchDataFromFirestore();
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView>
        {data.map((item) => (
          <View key={item.id}>
            <Text>{item.text}</Text>
            <Button
              title="Delete"
              onPress={() => handleDelete(item.id)}
              color="red"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
