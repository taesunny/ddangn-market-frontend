import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./About";
import UserLogin from "./User/UserLogin";
import Home from "../layout/Home";
import Lnb from "../layout/Lnb";
import ProductRegistration from "./Product/ProductRegistration";
import ProductDetail from "./Product/ProductDetail";
import ProductList from "./Product/ProductList";
import OAuth2RedirectHandler from "./User/oauth2/OAuth2RedirectHandler";
import { ACCESS_TOKEN } from "../Const";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Alert from "react-s-alert";
import { getCurrentUser } from "../utils/APIUtils";
import LoadingIndicator from "../layout/LoadingIndicator";
import Profile from "./User/profile/Profile";
import PrivateRoute from "./PrivateRoute";
import Signup from "./User/UserSignup";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: false,
    };

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    console.log("loadCurrentlyLoggedInUser");

    this.setState({
      loading: true,
    });

    getCurrentUser()
      .then((response) => {
        console.log("loadCurrentlyLoggedInUser success");

        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false,
        });

        console.log(
          "get currentUser success, authenticated: ",
          this.status.authenticated
        );
        console.log(this.status.authenticated);
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  }

  componentDidMount() {
    console.log("App.js");
    this.loadCurrentlyLoggedInUser();
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null,
    });
    Alert.success("You're safely logged out!");
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    }

    const contentStyle = {
      "marginLeft": "250px",
    };

    const backgroundStyle = {
      "maxWidth": "1200px",
    };

    return (
      <div className="w3-content" style={backgroundStyle}>
        <Router>
          <div>
            <Alert stack={{ limit: 6 }} timeout={120000} />
            {/* <Header /> */}
            <Lnb
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              onLogout={this.handleLogout}
            />
            <div style={contentStyle}>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/list" exact component={ProductList} />
                <Route
                  path="/products/:id"
                  render={(props) => (
                    <ProductDetail
                      authenticated={this.state.authenticated}
                      currentUser={this.state.currentUser}
                      {...props}
                    />
                  )}
                ></Route>
                <Route
                  path="/register"
                  render={(props) => (
                    <ProductRegistration
                      authenticated={this.state.authenticated}
                      currentUser={this.state.currentUser}
                      {...props}
                    />
                  )}
                ></Route>
                <Route path="/about" component={About} />
                <Route
                  path="/login"
                  render={(props) => (
                    <UserLogin
                      authenticated={this.state.authenticated}
                      currentUser={this.state.currentUser}
                      {...props}
                    />
                  )}
                ></Route>
                <Route
                  path="/signup"
                  render={(props) => (
                    <Signup
                      authenticated={this.state.authenticated}
                      {...props}
                    />
                  )}
                ></Route>
                <PrivateRoute
                  path="/profile"
                  authenticated={this.state.authenticated}
                  currentUser={this.state.currentUser}
                  component={Profile}
                ></PrivateRoute>
                <Route
                  path="/oauth2/redirect"
                  component={OAuth2RedirectHandler}
                ></Route>
                {/* <Route path="/accounts/google/login" component={UserLogin} /> */}
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
