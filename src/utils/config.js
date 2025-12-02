const axiosConfig = {
  headers: {
    "Content-type": "multipart/form-data;",
  },
  responseType: "json",
};

const axiosRESTConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
};

const Config = {
  localStoragePrefix: "ArgCasino_",
  axiosRESTConfig,
  axiosConfig,
  NotificationRequestIntervalMs:
    (import.meta.env.REACT_APP_ENVIRONMENT === "live" ? 0.5 : 2) * 60 * 1000, // Request interval
  NotificationAllowedDelayMs:
    (import.meta.env.REACT_APP_ENVIRONMENT === "live" ? 3 : 10) * 1000, // Delay tolerance
};

export const getApiHost = () => {
  return import.meta.env.VITE_API_URL;
};

export const getCurrentDomain = () => {
  return import.meta.env.VITE_CDN_URL;
};

export const getMediaCDN = () => {
  return import.meta.env.VITE_CDN_URL
};

export default Config;
