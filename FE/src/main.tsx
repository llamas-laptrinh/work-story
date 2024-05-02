import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@solana/wallet-adapter-react-ui/styles.css";

import { Buffer } from "buffer";
window.Buffer = window.Buffer || Buffer;

import { BrowserRouter } from "react-router-dom";
import WalletConnectionProvider from "./context/WalletConnectProvider.tsx";
import AppProvider from "./context/AppProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WalletConnectionProvider>
      <AppProvider>
        <BrowserRouter future={{ v7_startTransition: true }}>
          <App />
        </BrowserRouter>
      </AppProvider>
    </WalletConnectionProvider>
  </React.StrictMode>
);
