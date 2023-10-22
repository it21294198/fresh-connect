export interface UserLogin {
  email: string|null;
  type:boolean|null;
  address?:string|null|undefined;
  firstName?:string|null|undefined;
  lastName?:string|null|undefined;
  contactNo?:number|null|undefined;
  userId?:string|null|undefined;
}

export interface User{
  email:string;
  password:string;
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
