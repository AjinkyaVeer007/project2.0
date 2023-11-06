import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const projectModalSlice = createSlice({
  name: "projectModalData",
  initialState,
  reducers: {
    projectModalData: (state, action) => {
      return action.payload
    },
  },
});

export const { projectModalData } = projectModalSlice.actions;
export default projectModalSlice.reducer;
