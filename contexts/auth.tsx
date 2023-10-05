import { View, Text } from 'react-native'
import React, { createContext, useContext, useState } from 'react';
import { User,AuthContextType } from '../config/interfaces';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}:any) {

const [user, setUser] = useState(null);

const login = (userData:any) => {
    // Perform authentication logic, e.g., verify user credentials
    // If authentication succeeds, set the user
    setUser(userData);
  };

const logout = () => {
    // Perform logout logic
    setUser(null);
  };

  const signUp = (userData:any) => {
    // Perform user registration logic here and set the user if successful
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth():AuthContextType | undefined {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}