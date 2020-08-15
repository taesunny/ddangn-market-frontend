import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "w3-css/3/w3.css";
import { KeycloakProvider } from "react-keycloak";
import keycloak from "./keyclock";
// import keycloak from "./keyclock";

ReactDOM.render(<App />, document.getElementById("root"));

/*
keycloak
  .init({
    onLoad: "check-sso",
    // silentCheckSsoRedirectUri:
    //   window.location.origin + "/silent-check-sso.html",
  })
  .success((authenticated) => {
    if (!authenticated) {
      // window.location.reload();
      console.info("keycloak init, Not Authenticated");
    } else {
      console.info("keycloak init, Authenticated : ");
    }
    keycloak.authenticated && keycloak.loadUserInfo();
    //React Render on authentication
    

    //store authentication tokens in sessionStorage for usage in app
    sessionStorage.setItem("authenticated", authenticated);
    sessionStorage.setItem("authentication", keycloak.token);
    sessionStorage.setItem("refreshToken", keycloak.refreshToken);
    sessionStorage.setItem("isAdminUser", keycloak.hasRealmRole("admin"));

    //to regenerate token on expiry
    setTimeout(() => {
      keycloak
        .updateToken(70)
        .success((refreshed) => {
          if (refreshed) {
            console.debug("Token refreshed" + refreshed);
          } else {
            console.warn(
              "Token not refreshed, valid for " +
                Math.round(
                  keycloak.tokenParsed.exp +
                    keycloak.timeSkew -
                    new Date().getTime() / 1000
                ) +
                " seconds"
            );
          }
        })
        .error(() => {
          console.error("Failed to refresh token");
        });
    }, 60000);
  })
  .error(() => {
    console.error("Authenticated Failed");
  });
*/
