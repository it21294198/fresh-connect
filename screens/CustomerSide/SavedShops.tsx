import { View, Text, ScrollView, Button, Modal,TextInput ,StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react';
import { fireStore } from '../../config/firebase';
import {
  collection,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

interface ShopData {
  id: string;
  text: string;
  // Add other fields as needed
}

export default function SavedShops() {
  const [data, setData] = useState<ShopData[]>([]);
  const [selectedItem, setSelectedItem] = useState<ShopData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchDataFromFirestore();
  }, []);

  const fetchDataFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(fireStore, 'text'));
      const items:any = querySnapshot.docs.map(
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
      // After deleting the item, refresh the data
      fetchDataFromFirestore();
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  const handleEdit = (item: ShopData) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleUpdate = async () => {
    if (selectedItem) {
      // Update the selected item in Firestore with the updated data
      const itemDocRef = doc(fireStore, 'text', selectedItem.id);
      await setDoc(itemDocRef, { text: selectedItem.text });
      
      // Close the modal and refresh the data
      setModalVisible(false);
      fetchDataFromFirestore();
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView>
        {data.map((item) => (
          <View key={item.id}>
            <Text>{item.text}</Text>
            <Button title="Edit" onPress={() => handleEdit(item)} />
            <Button title="Delete" onPress={() => handleDelete(item.id)} color="red" />
          </View>
        ))}
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <TextInput
            value={selectedItem?.text}
            style={styles.textInput}
            onChangeText={(text) => {
              if (selectedItem) {
                setSelectedItem({ ...selectedItem, text });
              }
            }}
            placeholder="Edit Text"
            />
          <Button title="Update" onPress={handleUpdate} />
          <Button
            title="Cancel"
            onPress={() => {
              setModalVisible(false);
            }}
          />
        </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  textInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});