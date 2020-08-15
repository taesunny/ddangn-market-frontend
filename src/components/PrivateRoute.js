import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import Alert from "react-s-alert";

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export function PrivateRoute({ component: Component, roles, ...rest }) {
  const [keycloak] = useKeycloak();

  const isAutherized = (roles) => {
    if (keycloak && roles) {
      return roles.some((r) => {
        const realm = keycloak.hasRealmRole(r);
        const resource = keycloak.hasResourceRole(r);
        return realm || resource;
      });
    }

    console.log("유저 권한이 없습니다.")

    Alert.error("유저 권한이 없습니다.", {
      timeout: 5000,
    });

    sleep(5000)

    return false;
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return true ? (// isAutherized(roles) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        );
      }}
    />
  );
}

/*
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated ? (
        <Component {...rest} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);*/

export default PrivateRoute;
