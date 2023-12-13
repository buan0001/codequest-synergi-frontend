import { configureStore } from "@reduxjs/toolkit";
import loginStateReducer from "./features/LoginState";

// Funktion til at gemme loginstate i localStorage
const saveState = (state) => {
  try {
    const localStorageState = JSON.stringify(state);
    localStorage.setItem("loginState", localStorageState);
  } catch (err) {
    console.error("Der opstod en fejl ved at gemme i localstorage:", err);
  }
};

// Læs loginstate fra localStorage
const loadState = () => {
  try {
    const localStorageState = localStorage.getItem("loginState");
    if (localStorageState === null) {
      return undefined
    }
    return JSON.parse(localStorageState);
  } catch (err) {
    console.error("Der opstod en fejl ved at hente fra localstorage:", err);
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    loginState: loginStateReducer,
  },
  preloadedState: loadState(), // Læs state fra localStorage
});

// "Subscribe" til ændringer i state og gem i localStorage
store.subscribe(() => {
  const state = store.getState();
  saveState(state);
});

export default store;
