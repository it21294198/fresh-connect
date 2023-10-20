export interface UserLogin {
  email: string|null;
  type:boolean|null;
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
