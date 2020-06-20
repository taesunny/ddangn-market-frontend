import React, { Component } from "react";
import ddangnMarketLogo from "../img/ddangn-market-logo1.jpeg";

class Lnb extends Component {
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
          {this.props.authenticated ? (
            <a href="/register" class="w3-bar-item w3-button">
              Register product
            </a>
          ) : (
            <div>
              <a href="/login" className="w3-bar-item w3-button">
                Register product
              </a>
            </div>
          )}
          {this.props.authenticated ? (
            <a onClick={this.props.onLogout} className="w3-bar-item w3-button">
              Logout
            </a>
          ) : (
            <div>
              <a href="/login" className="w3-bar-item w3-button">
                Login / Signup
              </a>
            </div>
          )}
        </div>

        {this.props.authenticated ? (
          <p>{this.props.currentUser.name} Logged in</p>
        ) : (
          <p></p>
        )}
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
