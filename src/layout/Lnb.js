import React, { Component } from "react";
import ddangnMarketLogo from "../img/ddangn-market-logo1.jpeg";
import { handleLogOut, handleLogIn } from "../utils/CloakUtils";
import keycloak from "../keyclock";

class Lnb extends Component {

  componentDidMount() {
    // keycloak.loadUserProfile()
    // keycloak.authenticated && keycloak.loadUserInfo();

    // console.log("Lnb : ", keycloak);
  }

  render() {
    const lnbStyle = {
      zIndex: 3,
      width: "250px",
    };

    const menuStyle = {
      fontWeight: "bold",
    };

    const logoStyle = {
      width: "200px",
    };

    return (
      <nav
        className="w3-sidebar w3-bar-block w3-white w3-top"
        style={lnbStyle}
        id="mySidebar"
      >
        <div className="w3-container w3-display-container w3-padding-16">
          <h3 className="w3-wide">
            <a href="/" className="w3-bar-item w3-button">
              <img
                src={ddangnMarketLogo}
                alt="ddangn-markget-logo1"
                style={logoStyle}
              />
            </a>
          </h3>
        </div>
        <div className="w3-padding-64 w3-large w3-text-grey" style={menuStyle}>
          <a href="/" className="w3-bar-item w3-button">
            Home
          </a>
          <a href="/list" className="w3-bar-item w3-button">
            Product List
          </a>
          {keycloak.authenticated ? (
            <a href="/register" className="w3-bar-item w3-button">
              Register product
            </a>
          ) : (
            <div>
              <a
                onClick={() => keycloak.login()}
                className="w3-bar-item w3-button"
              >
                Register product
              </a>
            </div>
          )}
          {keycloak.authenticated ? (
            <a
              onClick={() => keycloak.logout()}
              className="w3-bar-item w3-button"
            >
              Logout
            </a>
          ) : (
            <div>
              <a
                onClick={() => keycloak.login()}
                className="w3-bar-item w3-button"
              >
                Login / Signup
              </a>
            </div>
          )}
        </div>
        <a
          href="https://github.com/taesunny"
          className="w3-bar-item w3-button w3-padding"
        >
          https://github.com/taesunny
        </a>
        <a className="w3-bar-item w3-button w3-padding">superbsun@gmail.com</a>
      </nav>
    );
  }
}

export default Lnb;
