import { createSlice } from "@reduxjs/toolkit";
import {Loading} from '../../util/interfaces'

const initialLoadState: Loading = {
  isLoading: false,
};

export const loaderSlice = createSlice({
  name: "user",
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
