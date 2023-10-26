export interface UserLogin {
  email: string|null;
  type:boolean|null;
  address?:string|null|undefined;
  firstName?:string|null|undefined;
  lastName?:string|null|undefined;
  contactNo?:number|null|undefined;
  userId?:string|null|undefined;
  isSeller?:boolean|null;
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

export interface locationObjectInterface{
    latitude: number,
    longitude: number,
    latitudeDelta?: number,
    longitudeDelta?: number,
}
export interface userSelectedCoordinateLocation{
  coordinate:
    {
      latitude: number,
      longitude: number
    }  
    position:{
      x: number;
      y: number;
    }
}

export interface shopDataInterface {
  shopName: string;
  address: string;
  description: string;
  shopAddress: {
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
  }
  email?: string;
  openAt?: any;
  closeAt?: any;
  contactNo?: number;
  shopId?: string;
}

export interface LocationObj{
  coords: {
    accuracy: number | null;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    latitude: number ;
    longitude: number;
    speed: number | null;
  }
  mocked?:boolean;
  timestamp: number;
}

export interface coordComparisionObject{
  coord1: {latitude: number | undefined; longitude: number| undefined;};
  
  coord2: {latitude: number| undefined; longitude: number| undefined;};
}

export interface ShopRegister{
  shopName:string;
  email:string;
  contactNo:number;
  description:string;
  openAt?:any;
  closeAt?:any;
  address:string;
  shopAddress?:any;
  accept:boolean;
}
export interface faqInterface{
  id?: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
}

