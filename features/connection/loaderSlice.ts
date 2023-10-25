import { createSlice } from "@reduxjs/toolkit";
import {LoadingState} from '../../util/interfaces'

const initialLoadState: LoadingState = {
  isLoading: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState: initialLoadState,
  reducers: {
    setLoadingTrue: (state) => {
      state.isLoading = true;
    },
    setLoadingFalse: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setLoadingTrue,setLoadingFalse} = loaderSlice.actions;

export default loaderSlice.reducer;