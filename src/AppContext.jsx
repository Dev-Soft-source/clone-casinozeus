import React, { createContext, useState, useEffect } from "react";
export const AppContext = createContext(null);

// este bloque de código se ejecuta antes de renderizar la página
// y contiene las variables globales de la aplicación (contextData)
const AppContextProvider = (props) => {
  let apiBaseUrl = process.env.REACT_APP_API_URL;//import.meta.env.REACT_API_URL;
  let serviceUrl = process.env.REACT_APP_SERVICE_URL;
  let cdnUrl = process.env.REACT_APP_CDN_URL;
  let pageTitle = process.env.REACT_APP_PAGE_TITLE;
  let buildMode = process.env.MODE;

  const getSessionFromStorage = () => {
    if (
      localStorage.getItem("session") &&
      localStorage.getItem("session") !== "undefined"
    ) {
      return JSON.parse(localStorage.getItem("session"));
    }
    return null;
  };

  let isMobile = navigator.userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
  );
  isMobile = (isMobile && (window.screen.width < 992));

  const [contextData, setContextData] = useState({
    apiBaseUrl: apiBaseUrl,
    serviceUrl: serviceUrl,
    cdnUrl: cdnUrl,
    buildMode: buildMode,
    session: getSessionFromStorage(),
    isMobile: isMobile,
    pageTitle: pageTitle,
  });

  const updateSession = (newSession) => {
    setContextData(prev => ({
      ...prev,
      session: newSession
    }));
  };
  
  return (
    <AppContext.Provider value={{ contextData, setContextData, updateSession }}>
      {props.children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
