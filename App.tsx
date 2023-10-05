import * as React from 'react';
import { StyleSheet } from 'react-native';
import { t } from 'react-native-tailwindcss';
import Ionicons from '@expo/vector-icons/Ionicons';
import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './Navigation/MainNavigation';
import { AuthProvider,useAuth } from './contexts/auth';

function Main() {

    NetInfo.fetch().then(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
      });
      
  return (
    <MainNavigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App(){
  return(
    <AuthProvider>
      <Main/>
    </AuthProvider>
  )
}

// Test Area
// export default function App() {
//   return (
//     // here using react native styles
//     <View style={styles.container}>
//       {/* here using tailwind styles refer following*/}
//       {/* https://tvke.github.io/react-native-tailwindcss/directional.html */}
//       <Text style={[t.bgBlue500,t.fontBold]}>Open up App.tsx to start working on your app!</Text>
//       {/* this is how to use env values */}
//       <Text style={[t.bgRed400]}>Test env keys : <Text style={[t.bgBlue700]}>{process.env.EXPO_PUBLIC_APP_ID}</Text></Text>
//       {/* this is how use icons */}
//       <Ionicons name="md-checkmark-circle" size={32} color="green" />
//       <StatusBar style="auto" />
//     </View>
//   );
// }