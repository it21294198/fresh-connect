import { View, ScrollView,StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fireStore } from '../../config/firebase';
import { collection, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Input, Icon } from "react-native-magnus";

interface ShopData {
  id: string;
  text: string;
}

export default function CustomerHomePage() {
  const [data, setData] = useState<ShopData[]>([]);

  useEffect(() => {
    fetchDataFromFirestore();
  }, []);

  const fetchDataFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(fireStore, 'text'));
      const items: any= querySnapshot.docs.map(
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


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Input
        placeholder="Username"
        p={10}
        m={20}
        focusBorderColor="green400"
        suffix={<Icon name="search" color="gray900" fontFamily="Feather" />}
        prefix={<Icon name="search" color="gray900" fontFamily="Feather" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 20,
    width: 350,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.4, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 4, // Android-specific elevation for shadow
  },
  footerContainer: {
    flexDirection: 'row',
    width: 'auto',
    height: 'auto',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
    top: 50,
  },
});
