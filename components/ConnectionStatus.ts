import NetInfo from '@react-native-community/netinfo';
import React,{useState} from 'react'

export function ConnectionStatus() {
    const [isConnected, setIsConnected] = useState<boolean | null>(null);
    const [conType, setConType] = useState('');

       NetInfo.fetch().then(state => {
        console.log('Connection type', state.type);
        setConType(state.type);
        console.log('Is connected?', state.isConnected);
        setIsConnected(state.isConnected);
      });

      return {isConnected,conType}
}