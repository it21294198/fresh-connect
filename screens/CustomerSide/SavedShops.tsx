import { View, Text, ScrollView, Button, Modal,TextInput ,StyleSheet,TouchableOpacity,Image, FlatList} from 'react-native';
import React, { useState, useEffect } from 'react';
import { fireStore } from '../../config/firebase';

export default function SavedShops() {
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
  }, []);

  const pressedShopImage = (id:any) =>{
    console.log('shopPressed',id);
  }

  const pressFevIcon = (id:any) =>{
    console.log('fevIconPressed',id);
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false); // Close the modal
  }

  const removeFromSavedShop = () =>{
    console.log('pressedRemoveSavedShop');
    setModalVisible(false); // Close the modal
  }
  const modalViewForFevIcon = () =>{
    return(
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContainerView}>
            <Image style={styles.askImage} source={require('../../assets/askIcon.png')}/>
            <View>
              <Text style={styles.textInModal}>Are you  sure you want to</Text>
              <Text style={styles.textInModal}>remove this shop from</Text>
              <Text style={styles.textInModal}>favourites ?</Text>
            </View>
            <View style={styles.modalBtnView}>
              <TouchableOpacity style={[styles.leftButton,{marginRight:20}]} onPress={closeModal}>
                <View style={styles.buttonTextContainer}><Text>No</Text></View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rightButton} onPress={()=>removeFromSavedShop()}>
                <View style={styles.buttonTextContainer}><Text style={{color:'white'}}>Yes</Text></View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleView}><Text style={styles.titleViewText}>Saved Shops</Text></View>
      {modalViewForFevIcon()}
      <FlatList
        data={savedShops}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.savedCard}>
            <View style={styles.savedCardTitleBarView}>
              <Text style={styles.savedCardTitle}>{item.title}</Text>
                <TouchableOpacity onPress={()=>pressFevIcon(item.id)}>
                  <View style={styles.fevIconView}>
                    <Image 
                      source={require('../../assets/favoutitesFilledIconImg.png')}
                      style={styles.fevIconImage}
                      resizeMode="contain"
                      />
                  </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>pressedShopImage(item.id)}>
              <Image
                resizeMode="cover"
                source={item.imageUrl}
                style={styles.savedImage}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    alignItems:'center'
  },
  modalContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',   
  },
  askImage:{
    margin:20
  },
  modalContainerView:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
    borderRadius:20,
    paddingHorizontal:20,
    height:350
  },
  textInModal:{
    textAlign: 'center',
    fontSize:16,
    fontWeight:'bold'
  },
  modalBtnView:{
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items at each end of the row
    paddingTop:30,
    paddingHorizontal: 10,
  },
  buttonTextContainer:{
    alignItems: 'center', // Vertically center the text
    justifyContent: 'center',
  },
  leftButton:{
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,  // Add a border of 2 units
    borderColor: 'black',
    width:120
  },
  rightButton:{
    backgroundColor: 'black', // Example background color
    padding: 10,
    borderRadius: 20,
    width:120
  },
  titleView:{
    margin:30,
    marginTop:40,
    alignItems:'center'
  },
  titleViewText:{
    fontSize:20,
    fontWeight:'bold'
  },
  savedCard:{
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4, // For Android shadow
    padding: 0,
    margin: 5,
  },
  savedCardTitleBarView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding:5,
  },
  fevIconImage:{
    width:20,
    height:20,
    marginBottom:5,
    marginLeft:60
  },
  savedImage:{
    width:170,
    height:120,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
  },
  savedCardTitle:{
    paddingLeft:10,
    paddingBottom:10,
    fontSize:15,
    fontWeight:'bold',
  },
  fevIconView:{
    position: 'absolute',
    top: -25, // Adjust the top position to place it at the top
    right: -10, // Adjust the right position to place it at the right
    padding: 10,
  }
});

  const savedShops = [
    {
      id:1,
      title:'hello',
      imageUrl:require('../../assets/shop.jpg')
    },
    {
      id:2,
      title:'helfsfsffs',
      imageUrl:require('../../assets/splash.png')
    },
    {
      id:3,
      title:'helfsfsffs',
      imageUrl:require('../../assets/splash.png')
    },
    {
      id:4,
      title:'helf',
      imageUrl:require('../../assets/splash.png')
    },
    {
      id:5,
      title:'helfsfsffs',
      imageUrl:require('../../assets/splash.png')
    },
    {
      id:6,
      title:'helfsfsffs',
      imageUrl:require('../../assets/splash.png')
    },
    {
      id:7,
      title:'helfsfsffs',
      imageUrl:require('../../assets/splash.png')
    },
    {
      id:8,
      title:'helfsfsffs',
      imageUrl:require('../../assets/splash.png')
    },
    {
      id:9,
      title:'helfsfsffs',
      imageUrl:require('../../assets/splash.png')
    },
    {
      id:10,
      title:'helfsfsffs',
      imageUrl:require('../../assets/splash.png')
    },
    {
      id:11,
      title:'helfsfsffs',
      imageUrl:require('../../assets/splash.png')
    },
    {
      id:12,
      title:'helfsfsffs',
      imageUrl:require('../../assets/splash.png')
    },
    {
      id:13,
      title:'helfsfsffs',
      imageUrl:require('../../assets/splash.png')
    }
  ]