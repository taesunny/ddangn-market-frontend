import Keycloak from 'keycloak-js'
import { KEYCLOAK_AUTH_SERVER_URL, KEYCLOAK_AUTH_REALM, KEYCLOAK_AUTH_CLIENT_ID } from './Const'
 
// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
    url: `${KEYCLOAK_AUTH_SERVER_URL}/auth`,
    realm: KEYCLOAK_AUTH_REALM,
    clientId: KEYCLOAK_AUTH_CLIENT_ID,
    // onLoad: "login-required",
  })
 
export default keycloak