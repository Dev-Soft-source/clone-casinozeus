import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import AppContextProvider from "./AppContext.jsx";
import { GameDataProvider } from "./components/GameDataContext.jsx";
import NotificationSnack from './components/notifications/NotificationSnack';
import favicon from "@/assets/favicon.webp";

const link = document.createElement("link");
link.rel = "icon";
link.type = "image/png";
link.href = favicon;
document.head.appendChild(link);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      {/* Redux first, independent */}
      <AppContextProvider>
        {" "}
        {/* App-level context next */}
        <SnackbarProvider
          maxSnack={5}
          Components={{
            notificationAlert: NotificationSnack,
          }}
        >
          <GameDataProvider>
            {" "}
            {/* Shared data (Layout + LandingPage) */}
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </GameDataProvider>
        </SnackbarProvider>
      </AppContextProvider>
    </Provider>
  </React.StrictMode>
);
