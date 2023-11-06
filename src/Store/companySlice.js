import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const companySlice = createSlice({
  name: "companyData",
  initialState,
  reducers: {
    companyData: (state, action) => {
      return action.payload
    },
  },
});

export const { companyData } = companySlice.actions;
export default companySlice.reducer;
