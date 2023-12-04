import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import loginStateReducer from './features/loginState'

const store = configureStore({
  reducer: {
    loginState: loginStateReducer,
  },
})  

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
