import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { UserLogin } from "../../util/interfaces";

const initialUserState:UserLogin ={
    email:null,
    type:null
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
        swithcUser:(state)=>{
            state.type = null
        }
    }
})

export const { logUser,logOut,setType,swithcUser } = userSlice.actions;

export default userSlice.reducer;