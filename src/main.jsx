import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/configStore.js";
import { handleResponseWithLoginCheck } from "./services/base.service.js";

handleResponseWithLoginCheck();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
