import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  assets: [],
};
export const getAssets = createAsyncThunk("assets", async () => {
  let response = await axios.get("https://api.coincap.io/v2/assets");
  let resData = response?.data;
  return resData;
});
export const cryptoSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAssets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAssets.fulfilled, (state,{payload}) => {
          state.status = "loading";
          state.assets = payload?.data
      })
      .addCase(getAssets.rejected, (state) => {
        state.status = "loading";
      });
     
  },
});
export default cryptoSlice;
