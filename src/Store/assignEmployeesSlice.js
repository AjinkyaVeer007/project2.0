import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    assignEmployees : [],
    assignManagers : []
}

const assignEmployeeSlice = createSlice({
  name: "assignEmployeeData",
  initialState,
  reducers: {
    assignEmployeesList: (state, action) => {
      state[action.payload.type] = action.payload.value
    },
    handleAssign : (state, action) => {
      let targetIndex = state[action.payload.type].findIndex((user) => {
       return  user.id ===action.payload.id
      })
      state[action.payload.type][targetIndex].assign = true
    },
    handleRemoveAssign : (state, action) => {
      let targetIndex = state[action.payload.type].findIndex((user) => {
        return  user.id ===action.payload.id
      })
      state[action.payload.type][targetIndex].assign = false
    },
  },
});

export const { assignEmployeesList, handleAssign, handleRemoveAssign } = assignEmployeeSlice.actions;
export default assignEmployeeSlice.reducer;
