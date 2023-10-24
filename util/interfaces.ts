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
  firstName?:any;
  lastName?: any;
  username?: string;
  password:string;
  email:string;
  type?: string;
  logStatus?: boolean;
}

export interface LoadingState{
  isLoading: boolean;
}

export interface UserSignIn{
  firstName?:string;
  lastName?:string;
  userId?:string;
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

export interface ShopRegister{
  shopName:string;
  email:string;
  contactNo:number;
  description:string;
  openAt?:any;
  closeAt?:any;
  address:string;
  accept:boolean;
}
