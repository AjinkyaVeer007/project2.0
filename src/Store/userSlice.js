import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data : null
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    userData: (state, action) => {
      state.data = action.payload
    },
  },
});

export const { userData } = userSlice.actions;
export default userSlice.reducer;
