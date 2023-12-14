import { configureStore } from "@reduxjs/toolkit";
import loginStateReducer from "./features/LoginState";

// Function to save loginstate in localstorage
const saveState = (state) => {
  try {
    const localStorageState = JSON.stringify(state);
    localStorage.setItem("loginState", localStorageState);
  } catch (err) {
    console.error("Der opstod en fejl ved at gemme i localstorage:", err);
  }
};

// Read loginstate from localStorage
const loadState = () => {
  try {
    const localStorageState = localStorage.getItem("loginState");
    if (localStorageState === null) {
      return undefined;
    }
    return JSON.parse(localStorageState);
  } catch (err) {
    console.error("Der opstod en fejl ved at hente fra localstorage:", err);
    return undefined;
  }
};

// Configure the Redux store
const store = configureStore({
  reducer: {
    loginState: loginStateReducer,
  },
  preloadedState: loadState(), // Read state from localStorage
});

// Listen for changes in state and save to localStorage
store.subscribe(() => {
  const state = store.getState();
  saveState(state);
});

export default store;
