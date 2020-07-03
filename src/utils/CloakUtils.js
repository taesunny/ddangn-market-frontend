import Alert from "react-s-alert";

export function getUsername(keycloak) {
  return (
    keycloak.authenticated &&
    keycloak.tokenParsed &&
    keycloak.tokenParsed.preferred_username
  );
}

export function isAdmin(keycloak) {
  return keycloak.authenticated && isAdmin(keycloak);
}

export function checkAuthenticated() {
  const { keycloak } = this.props;
  if (!keycloak.authenticated) {
    this.handleLogInOut();
  }
}

// export function handleLogIn(props) {
//   const { keycloak, history } = props;
//   if (keycloak.authenticated) {
//     history.push("/");
//     keycloak && keycloak.logout();
//     Alert.success("You're safely logged out!");
//   } else {
//     keycloak && !!keycloak.authenticated && keycloak.login();
//   }
// }

// export function handleLogOut(props) {
//   const { keycloak, history } = props;
//   if (keycloak.authenticated) {
//     history.push("/");
//     keycloak && keycloak.logout();
//     Alert.success("You're safely logged out!");
//   } else {
//     keycloak && !!keycloak.authenticated && keycloak.login();
//   }
// }
