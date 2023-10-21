export interface User {
  username: string;
  type: string;
  logStatus: boolean;
}

// Define the context type
export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  signUp: (userData: User) => void;
}

export interface customDrawerPropsInterface {
  drawerActiveTintColor?: string;
  drawerActiveBackgroundColor?: string;
  drawerIcon?: {
    focused?: boolean;
    color?: string;
    size?: number;
  };
}

export interface drawerProfileInterface{
  CustomerProfile: any | undefined;
}
