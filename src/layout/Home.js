import React, { Component } from "react";
import Header from "./Header";
import ddangnMarketLogo from "../img/ddangn-market-logo2.png";

const Home = ({ children }) => {
  return (
    <div>
      <Header menuName="Home"></Header>
      <HomeBody></HomeBody>
    </div>
  );
};

class HomeBody extends Component {
  render() {
    const logoStyle = {
      width: "100%",
    };

    const logoInfoStyle = {
      padding: "0px 130px 0px 0px",
    };

    const alignRight = {
      float: "right",
    };

    return (
      <div className="w3-display-container w3-container">
        <img src={ddangnMarketLogo} alt="ddangn-logo" style={logoStyle} />
        <div className="w3-display-topright w3-text-black" style={logoInfoStyle}>
          <br></br>
          <br></br>
          <br></br>
          <h1 className="w3-hide-small">지금바로 사고파세요!!!</h1>
          <h1 className="w3-hide-large w3-hide-medium">지금바로 사고파세요!!!</h1>
          <p>
            <a
              href="/list"
              className="w3-button w3-orange w3-padding-large w3-large"
              style={alignRight}
            >
              GO TO PRODUCT LIST
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
