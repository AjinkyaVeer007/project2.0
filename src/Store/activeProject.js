import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectId: null,
};

const activeProjectSlice = createSlice({
  name: "activeProjectId",
  initialState,
  reducers: {
    activeProjectId: (state, action) => {
      state.projectId = action.payload;
    },
  },
});

export const { activeProjectId } = activeProjectSlice.actions;
export default activeProjectSlice.reducer;
