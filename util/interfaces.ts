export interface UserLogin {
  email: string|null;
  type:boolean|null;
  address?:string|null|undefined;
  firstName?:string|null|undefined;
  lastName?:string|null|undefined;
  contactNo?:number|null|undefined;
  userId?:string|null|undefined;
}

export interface User {
  username?: string;
  password:string;
  email:string;
  type?: string;
  logStatus?: boolean;
}

export interface Loading {
  isLoading: boolean;
}

export interface UserSignIn{
  firstName:string;
  lastName:string;
  email:string;
  password:string;
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
