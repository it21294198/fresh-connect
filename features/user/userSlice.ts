import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { UserLogin } from "../../util/interfaces";

const initialUserState:UserLogin ={
    email:null,
    type:null,
    address:null,
    firstName:null,
    lastName:null,
    contactNo:null,
    userId:null,
    isSeller:null
}

export const userSlice = createSlice({
    name:'user',
    initialState:initialUserState,
    reducers:{
        logUser:(state, action: PayloadAction<string | null>)=>{
            state.email=action.payload
        },
        logOut:(state)=>{
            state.email=null,
            state.type=null
        },
        setType:(state,action:PayloadAction<boolean | null>)=>{
            state.type = action.payload
        },
        setUserId:(state,action:PayloadAction<string| null>)=>{
            state.userId = action.payload
        },
        setUserInitials:(state,action:PayloadAction<any>)=>{
            if (action.payload.firstName !== undefined) {
                state.firstName = action.payload.firstName;
            }
            if (action.payload.lastName !== undefined) {
                state.lastName = action.payload.lastName;
            }
            if (action.payload.userId !== undefined) {
                state.userId = action.payload.userId;
            }
            if (action.payload.isSeller !== undefined) {
                state.isSeller = action.payload.isSeller;
            }
        },
        swithcUser:(state)=>{
            state.type = null
        },
        setUserDetails:(state,action:PayloadAction<any>)=>{
            if (action.payload.address !== undefined) {
                state.address = action.payload.address;
            }
            if (action.payload.firstName !== undefined) {
                state.firstName = action.payload.firstName;
            }
            if (action.payload.lastName !== undefined) {
                state.lastName = action.payload.lastName;
            }
            if (action.payload.contactNo !== undefined) {
                state.contactNo = action.payload.contactNo;
            }
            if (action.payload.userId !== undefined) {
                state.userId = action.payload.userId;
            }
        }
    }
})

export const { logUser,logOut,setType,swithcUser,setUserInitials } = userSlice.actions;

export default userSlice.reducer;

// this is the way of adding data
// dispatch(
//   setUserDetails({
//     address: 'New Address',
//     firstName: 'New First Name',
//     lastName: 'New Last Name',
//     contactNo: 'New Contact Number',
//     userId: 'New User ID',
//   })
// );

// dispatch(
//     setUserInitials({
//      firstName: user.firstName,
//      lastName: user.lastName,
//      userId: userRef,
//     })
// )