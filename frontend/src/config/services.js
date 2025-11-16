// src/config/services.js
const ENV_SERVER =
  import.meta.env?.VITE_ENV_SERVER ||
  process.env?.VITE_ENV_SERVER ||
  "local";

// Base Domains
const ACCOUNTS_API_DOMAIN = "accounts.purpleblue.site";
const LIVESTOCK_API_DOMAIN = "livestock.purpleblue.site";
const ANALYSIS_API_DOMAIN = "analysis.purpleblue.site";

// Enviroment Routing
const SERVICES = {
  prod: {
    accounts:  `https://${ACCOUNTS_API_DOMAIN}`,
    livestock: `https://${LIVESTOCK_API_DOMAIN}`,
    analysis:  `https://${ANALYSIS_API_DOMAIN}`,
  },
  dev: {
    accounts:  `https://dev.${ACCOUNTS_API_DOMAIN}`,
    livestock: `https://dev.${LIVESTOCK_API_DOMAIN}`,
    analysis:  `https://dev.${ANALYSIS_API_DOMAIN}`,
  },
  local: {
    accounts:  "http://127.0.0.1:8001",
    livestock: "http://127.0.0.1:8000",
    analysis:  "http://127.0.0.1:8002",
  },
};

// Services URLs
export const ACCOUNTS_API_URL  = SERVICES[ENV_SERVER]?.accounts;
export const LIVESTOCK_API_URL = SERVICES[ENV_SERVER]?.livestock;
export const ANALYSIS_API_URL  = SERVICES[ENV_SERVER]?.analysis;

export const API_SERVICES = {
  env: ENV_SERVER,
  accounts:  ACCOUNTS_API_URL,
  livestock: LIVESTOCK_API_URL,
  analysis:  ANALYSIS_API_URL,
};
