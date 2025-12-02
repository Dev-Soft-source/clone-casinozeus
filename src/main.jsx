import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from './utils/store.js'
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from "notistack";
import AppContextProvider from './AppContext.jsx'
import CssBaseline from '@mui/material/CssBaseline';
import { ApiErrorDialog } from "./components/ApiErrorDialog/ApiErrorDialog";
import ApiErrorDisplay from "./components/common/api-error-v2/ApiErrorDisplay";
import FullNotificationWindow from './components/notifications/notification-elements/FullNotificationWindow';
import NotificationSnack from './components/notifications/NotificationSnack';
import { theme } from "./utils/theme";

import './css/Home.css'
import './css/Poseidon.css'
import './css/Calendar.css'
import './css/main.css'
import './css/ApiErrorDialog.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={5}
            Components={{
              notificationAlert: NotificationSnack
            }}
          >
            <CssBaseline />
            <App className="normal-mode app-mode" />
            <ApiErrorDialog />
            <ApiErrorDisplay />
            <FullNotificationWindow />
          </SnackbarProvider>
        </ThemeProvider>
      </AppContextProvider>
    </Provider>
  </BrowserRouter>

  // </StrictMode>
)
