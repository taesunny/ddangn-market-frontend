import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div>
        <header className="w3-container w3-xlarge">
          <p className="w3-left">{this.props.menuName}</p>
          <p className="w3-right"></p>
        </header>
      </div>
    );
  }
}

export default Header;
