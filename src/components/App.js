import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./About";
import Home from "../layout/Home";
import Lnb from "../layout/Lnb";
import ProductRegistration from "./Product/ProductRegistration";
import ProductDetail from "./Product/ProductDetail";
import ProductList from "./Product/ProductList";
import ProductChatting from "./Product/ProductChatting";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Alert from "react-s-alert";
import LoadingIndicator from "../layout/LoadingIndicator";
import AppPushRegistration from "./Notification/AppPushRegistration";
import PrivateRoute from "./PrivateRoute";
import { KeycloakProvider } from "@react-keycloak/web";
import keycloak from "../keyclock";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userEmail: "",
    };
  }

  // loadCurrentlyLoggedInUser() {
  //   console.log("loadCurrentlyLoggedInUser");

  //   this.setState({
  //     loading: true,
  //   });
  // }

  componentDidMount() {
    console.log("App.js");
  }

  // handleLogout() {
  //   localStorage.removeItem(ACCESS_TOKEN);
  //   this.setState({
  //     authenticated: false,
  //     currentUser: null,
  //   });
  //
  // }

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    }

    const contentStyle = {
      marginLeft: "250px",
    };

    const backgroundStyle = {
      maxWidth: "1200px",
    };

    return (
      <div className="w3-content" style={backgroundStyle}>
        <KeycloakProvider
          keycloak={keycloak}
          initConfig={{
            onLoad: "check-sso",
            promiseType: "native",
            checkLoginIframe: false,
          }}
          onEvent={(event, error) => {
            if (event === "onAuthSuccess") {
              console.log("load user info", event, error);
              keycloak.loadUserInfo();
            }
          }}
        >
          <Router>
            <div>
              <Alert stack={{ limit: 6 }} timeout={120000} />
              {/* <Header /> */}
              <Lnb
              // authenticated={keycloak.authenticated}
              // userEmail={keycloak.authenticated ? this.userEmail : ""}
              // currentUser={getUsername(keycloak)}
              // keycloak={keycloak}
              />
              <div style={contentStyle}>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/list" exact component={ProductList} />
                  <Route
                    path="/products/:id/chatting"
                    render={(props) => <ProductChatting {...props} />}
                  ></Route>
                  <Route
                    path="/products/:id"
                    render={(props) => <ProductDetail {...props} />}
                  ></Route>
                  <Route
                    path="/register"
                    render={(props) => <ProductRegistration {...props} />}
                  ></Route>
                  <Route
                    path="/register-app-push"
                    render={(props) => <AppPushRegistration {...props} />}
                  ></Route>
                  <Route path="/about" component={About} />
                  {/* <Route
                    path="/login"
                    render={(props) => (
                      <UserLogin
                        authenticated={this.keycloak.authenticated}
                        currentUser={getUsername(this.keycloak)}
                        keycloak={this.keycloak}
                        {...props}
                      />
                    )}
                  ></Route>
                  <Route
                    path="/signup"
                    render={(props) => (
                      <Signup
                        authenticated={keycloak.authenticated}
                        currentUserId={getUsername(keycloak)}
                        keycloak={keycloak}
                        {...props}
                      />
                    )}
                  ></Route> */}
                  {/* <PrivateRoute
                    path="/profile"
                    authenticated={keycloak.authenticated}
                    currentUser={this.state.currentUser}
                    component={Profile}
                  ></PrivateRoute> */}
                  {/* <Route
                    path="/oauth2/redirect"
                    component={OAuth2RedirectHandler}
                  ></Route> */}
                  {/* <Route path="/accounts/google/login" component={UserLogin} /> */}
                </Switch>
              </div>
            </div>
          </Router>
        </KeycloakProvider>
      </div>
    );
  }
}

export default App;
