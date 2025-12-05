const AppEnv = {
  environment: import.meta.env.REACT_APP_ENVIRONMENT,
  siteName: import.meta.env.REACT_APP_SITE_NAME,
  legacyAPIUrl: import.meta.env.REACT_APP_API_HOST,
  apiUrl: import.meta.env.REACT_APP_API_URL,
  currentDomain: import.meta.env.REACT_APP_CURRENT_DOMAIN,
  mediaCDN: import.meta.env.REACT_APP_MEDIA_CDN
};

export default AppEnv;
