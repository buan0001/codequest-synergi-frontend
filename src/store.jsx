import { configureStore } from "@reduxjs/toolkit";
import loginStateReducer from "./features/loginState";

console.log('bingchilling');

const store = configureStore({
  reducer: {
    loginState: loginStateReducer,
  },
});  

export default store;
