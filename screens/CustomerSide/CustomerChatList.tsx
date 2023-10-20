import { View, Text, Platform, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button, Icon } from 'react-native-magnus'

export default function CustomerChatList({ navigation }: any) {
  const newUser = {
    _id: 1,
    name: 'Akmal'
  }
  const chatList = [
    {
      id: '1',
      name: 'Nuwara Farm Chat'
    },
    {
      id: '2',
      name: 'Western Farm Chat'
    },
    {
      id: '3',
      name: 'Wayamba Farm Chat'
    },
  ]
  return (
    <View style={styles.container}>
      <FlatList
      style={styles.list}
        data={chatList}
        keyExtractor={item => item.id} 
        renderItem={({ item }:any) => (
            <Button
              mt="lg"
              px="xl"
              py="lg"
              bg="white"
              w={'100%'}
              borderWidth={1}
              borderColor="green"
              color="red500"
              underlayColor="red100"
              suffix={<Icon name="arrowright" ml="md" color="grren"/>}
              onPress={() => navigation.navigate('Chat', { user: newUser,name:item.name })}
            >    {item.name}
            </Button>
        )}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    width: 200,
  },
  btnContainer1: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'flex-end', // Right-align content
    marginTop: 20,
    paddingRight: 20,
  },
  btnContainer: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'flex-end', // Right-align content
  },
  card: {
    width: Platform.OS === 'android' ? '90%' : '50%',
    marginBottom: 20,
    marginTop: 20
  },
  cardCover: {
    width: '100%',
    aspectRatio: 16 / 9,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  containerStyle: {
    width: '100%',
    height: '80%',
    backgroundColor: 'white',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  dialog: {
    width: Platform.OS === 'android' ? '90%' : '30%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  list:{
    width:'80%'
  },
  scrollview: {
    minHeight: '100%'
  }
})