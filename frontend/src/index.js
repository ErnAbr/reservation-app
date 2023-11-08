import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./services/LoginProvider";
import { ReservedDateProvider } from "./services/ReservedDateProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoginProvider>
      <ReservedDateProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReservedDateProvider>
    </LoginProvider>
  </React.StrictMode>
);
