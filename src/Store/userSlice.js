import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData : null,
    companyData : null,
    employeesList : [],
    projectList : []
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    userData: (state, action) => {
      state[action.payload.name] = action.payload.value
    },
  },
});

export const { userData } = userSlice.actions;
export default userSlice.reducer;
