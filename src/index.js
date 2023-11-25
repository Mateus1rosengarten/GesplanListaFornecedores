import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SuppliersDataContext from "./context/suppliersDataContext";
import ModalPopUpContext from "./context/modalPopUpContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <SuppliersDataContext>
    <ModalPopUpContext>
      <App />
    </ModalPopUpContext>
  </SuppliersDataContext>

  // </React.StrictMode>
);

reportWebVitals();
