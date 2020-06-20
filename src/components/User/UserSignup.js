import React, { Component } from "react";
import "./UserSignup.css";
import { Link, Redirect } from "react-router-dom";
// import Alert from "react-s-alert";
// import { signup } from "../../utils/APIUtils";
import {
  GOOGLE_AUTH_URL,
  GITHUB_AUTH_URL,
  // FACEBOOK_AUTH_URL,
} from "../../Const";
// import fbLogo from "../../img/fb-logo.png";
import googleLogo from "../../img/google-logo.png";
import githubLogo from "../../img/github-logo.png";
import Header from "../../layout/Header";

class Signup extends Component {
  render() {
    if (this.props.authenticated) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: this.props.location },
          }}
        />
      );
    }

    const signupStyle = {
      "textAlign": "center",
      "minWidth": "500px",
    };

    return (
      <div>
        <Header menuName="Sign Up"></Header>
        <div className="w3-padding-32 " style={signupStyle}>
          <div className="login-content">
            <ul className="w3-ul w3-border w3-white w3-center">
              <li className="w3-black w3-xlarge w3-padding-32">
                Sign Up with Social
              </li>
              <li className="w3-padding-16">
                <a type="submit" href={GOOGLE_AUTH_URL}>
                  <img
                    src={googleLogo}
                    className="social-btn__img"
                    alt="Google"
                  />{" "}
                  Sign Up with Google
                </a>
              </li>
              <li className="w3-padding-16">
                <a type="submit" href={GITHUB_AUTH_URL}>
                  <img
                    src={githubLogo}
                    className="social-btn__img"
                    alt="Github"
                  />{" "}
                  Sign Up with Github
                </a>
                <br/>(email이 공개인 경우만 사용 가능)
              </li>
              <li className="w3-light-grey w3-padding-24">
                Already have an account?{" "}
                <Link to="/login">
                  <button className="w3-button w3-teal w3-padding-large w3-hover-black">
                    Login!
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

/*
class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const signUpRequest = Object.assign({}, this.state);

    signup(signUpRequest)
      .then((response) => {
        Alert.success(
          "You're successfully registered. Please login to continue!",
          {
            timeout: 3000,
          }
        );
        this.props.history.push("/login");
      })
      .catch((error) => {
        Alert.error(
          (error && error.message) ||
            "Oops! Something went wrong. Please try again!"
        );
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-item">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="form-item">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="form-item">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="form-item">
          <button type="submit" className="btn btn-block btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}*/

export default Signup;
