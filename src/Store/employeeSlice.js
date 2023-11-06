import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const employeeSlice = createSlice({
  name: "EmployeeData",
  initialState,
  reducers: {
    employeeData: (state, action) => {
      return action.payload
    },
  },
});

export const { employeeData } = employeeSlice.actions;
export default employeeSlice.reducer;
