// Redux slice for managing login state
// Contains initial state, reducers, and actions for login and logout

import { createSlice } from "@reduxjs/toolkit";

// Initial state for login state slice
const initialStateValue = {
  loggedIn: false,
  username: "",
  password: "",
};

// Creating the loginState slice
export const loginStateSlice = createSlice({
  name: "loginState",
  initialState: { value: initialStateValue },
  reducers: {
    // Reducer for handling login action
    login: (state, action) => {
      const { username, password } = action.payload;
      if (username === "admin" && password === "admin") {
        return {
          ...state,
          loggedIn: true,
          username: action.payload.username,
          password: action.payload.password,
        };
      } else {
        return state;
      }
    },

    // Reducer which handles logout action
    logout: (state) => {
      return {
        ...state,
        loggedIn: false,
        username: "",
        password: "",
      };
    },
  },
});

export const { login, logout } = loginStateSlice.actions;
export default loginStateSlice.reducer;
