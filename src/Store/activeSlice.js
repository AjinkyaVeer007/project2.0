import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarActiveItem: null,
    leftSidebarActive: true,
    topSidebarActive: false
};

const activeSlice = createSlice({
  name: "activeData",
  initialState,
  reducers: {
    activeData: (state, action) => {
      state[action.payload.name] = action.payload.value
    },
  },
});

export const { activeData } = activeSlice.actions;
export default activeSlice.reducer;
