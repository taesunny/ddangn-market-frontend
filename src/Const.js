export const API_BASE_URL = "http://localhost:8090/product-service";
export const APP_SERVER_API_BASE_URL = "http://localhost:8090/app-server";
export const ACCESS_TOKEN = "accessToken";

export const KEYCLOAK_AUTH_SERVER_URL = "http://localhost:8080";
export const KEYCLOAK_AUTH_REALM = "ddangn-market";
export const KEYCLOAK_AUTH_CLIENT_ID = "react-web-local";

export const OAUTH2_REDIRECT_URI = "http://localhost:3000/oauth2/redirect";

export const GOOGLE_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorize/facebook?redirect_uri=" +
  OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/github?redirect_uri=" + OAUTH2_REDIRECT_URI;
