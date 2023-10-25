import { View, Platform, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Icon, Div, Text } from 'react-native-magnus'
import { getChatRooms, getMessages, getUser } from '../ChatController'

export default function CustomerChatList({ route, navigation }: any) {
  const [chatRoom, setChatRoom] = useState<any[]>([])
  const [name,setName] =useState("")
  const [lastMsg,setLastMsg] =useState<string>("")
  const [time,setTime] =useState<string>("")
  //const { user } = route.params

  const user1 = {
    id: "8SoZKFk8U0q6l2lEbogL",
    name: 'John'
  }

  async function getRooms() {
    const newRooms: any = await getChatRooms(user1.id)
    setChatRoom(newRooms)
  }

  // async function renderLastMessage(id:string) {
  //   const lastMessage: any = await getMessages(id)
  //   return(
  //     <Text>
  //       {lastMessage[0]}
  //     </Text>
  //   )
  // }

  // async function getRoomUser(id:string) {
  //   let roomUser: string
  //   getUser(id).then((user:string) => {
  //     roomUser = user
  //   })
  //   return roomUser
  // }

  useEffect(() => {
    getRooms()
  }, [lastMsg])

  // const user1 = {
  //   id: "8SoZKFk8U0q6l2lEbogL",
  //   name: 'John'
  // }

  // const user2 = {
  //   id: "Z04NU1rDCHE8GNus2HbL",
  //   name: 'Peter' 
  // }
  // const chatRooms = [
  //   {
  //     id: '8oCIlz7fwspqb6EOZG4D1',
  //     name: 'Nuwara Farm Chat'
  //   },
  //   {
  //     id: 'nglQRgIiMMIqccafJeFm',
  //     name: 'Western Farm Chat'
  //   },
  // ]

  const renderChatRooms:any = chatRoom.map(async (room, index) => {
    //renderLastMessage(room.id)
    await getMessages(room.id).then((msg:any) => {
      setLastMsg(msg[0].message)
      setTime(msg[0].timestamp.toDate().toLocaleTimeString())
    })
    await getUser(room.participants[1]).then((user:string) => {
      setName(user)
    })
    //const name:string = getRoomUser(room.participants[1])
    return (
      <Div key={index} m="sm" rounded="lg" bg="white" shadow="md" p="md">
        <TouchableOpacity onPress={() => {navigation.navigate('Chat', { user: user1, chatRoom: room.id })}}>
        <Div row>

        <Div flex={1} alignItems='flex-start' mt="sm">
        <Text fontWeight="bold" fontSize="xl">
        <Icon name='user-circle' fontFamily='FontAwesome5' fontSize={20} color='white' bg='blue500' mx="md" h={30} w={30} rounded="circle" />  
        {name}
        </Text>
        </Div>

        <Div flex={1} alignItems='flex-end'>
        <Text fontSize="md" color="gray500" ml="md" mt="md">
        {time}
        </Text>
        </Div>

        </Div>
        <Div row>
        <Text fontSize="md" color="gray500" ml="md" mt="sm">
        {lastMsg}
        </Text>
        </Div>
        </TouchableOpacity>
      </Div>
    )
  })

  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.container}>
        {renderChatRooms}
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    minHeight: '100%'
  },
})