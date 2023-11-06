import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import activeSlice from "./activeSlice";
import userSlice from "./userSlice";
import companySlice from "./companySlice";
import employeeSlice from "./employeeSlice";
import projectSlice from "./projectSlice";
import assignEmployees from "./assignEmployeesSlice";
import projectModalSlice from "./projectModalSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
    activeItemData : activeSlice,
    userData: userSlice,
    companyData: companySlice,
    employeesData: employeeSlice,
    projectsData:  projectSlice,
    assignEmployeesData : assignEmployees,
    projectModalData : projectModalSlice
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
