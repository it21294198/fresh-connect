export interface User {
  username: string;
  type:string;
  logStatus:boolean;
}

// Define the context type
export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  signUp: (userData: User) => void;
}

