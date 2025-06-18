import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";

const combinedReducers = combineReducers({
  profile: profileReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined; // Reset the state on logout
  }
  return combinedReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
