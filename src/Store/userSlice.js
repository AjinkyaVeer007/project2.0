import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    userData: (state, action) => {
      return action.payload
    },
  },
});

export const { userData } = userSlice.actions;
export default userSlice.reducer;
