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
  localStoragePrefix: "Casinozeus_",
  axiosRESTConfig,
  axiosConfig,
  // NotificationRequestIntervalMs:
  //   (process.env.REACT_APP_SITE_NAMEAPP_ENVIRONMENT === "live" ? 0.5 : 2) * 60 * 1000, // Request interval
  // NotificationAllowedDelayMs:
  //   (process.env.REACT_APP_SITE_NAMEAPP_ENVIRONMENT === "live" ? 3 : 10) * 1000, // Delay tolerance
};

export const getApiHost = () => {
  return process.env.REACT_APP_API_URL;
};

export const getCurrentDomain = () => {
  return process.env.REACT_APP_CDN_URL;
};

export const getMediaCDN = () => {
  return process.env.REACT_APP_CDN_URL;
};

export default Config;
