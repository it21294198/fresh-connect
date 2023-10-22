import { View,StyleSheet,ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loading() {
  return (
    <View style={styles.container}>
       <ActivityIndicator size="large" color="#45A053" style={styles.spinner}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
  },
  spinner: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 10,
    padding: 20,
  },
});