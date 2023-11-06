import {createSlice} from "@reduxjs/toolkit"

const initialState = [];

const projectSlice = createSlice({
    name: "projectData",
    initialState,
    reducers : {
        projectData : (state, action) => {
            return action.payload
        }
    }
})

export const {projectData} = projectSlice.actions
export default projectSlice.reducer