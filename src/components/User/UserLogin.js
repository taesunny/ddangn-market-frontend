import React, { Component } from "react";
import Header from "../../layout/Header";
import "./UserLogin.css";
// import fbLogo from "../../img/fb-logo.png";
import { Link, Redirect } from "react-router-dom";
import googleLogo from "../../img/google-logo.png";
import githubLogo from "../../img/github-logo.png";
import {
  GOOGLE_AUTH_URL,
  // FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
  // ACCESS_TOKEN,
} from "../../Const";
import Alert from "react-s-alert";
// import { login } from "../../utils/APIUtils";

class UserLogin extends Component {
  componentDidMount() {
    // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error
    // Here we display the error and then remove the error query parameter from the location.
    if (this.props.location.state && this.props.location.state.error) {
      setTimeout(() => {
        Alert.error(this.props.location.state.error, {
          timeout: 5000,
        });
        this.props.history.replace({
          pathname: this.props.location.pathname,
          state: {},
        });
      }, 100);
    }
  }

  render() {
    console.log("this.props-userlogin : ", this.props);
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

    const loginStyle = {
      "textAlign": "center",
      "minWidth": "500px",
    };

    return (
      <div>
        <Header menuName="Log In"></Header>
        <div className="w3-padding-32 " style={loginStyle}>
          <div className="login-content">
            <ul className="w3-ul w3-border w3-white w3-center">
              <li className="w3-black w3-xlarge w3-padding-32">
                Log In with Social
              </li>
              <li className="w3-padding-16">
                <a type="submit" href={GOOGLE_AUTH_URL}>
                  <img
                    src={googleLogo}
                    className="social-btn__img"
                    alt="Google"
                  />{" "}
                  Log In with Google
                </a>
              </li>
              <li className="w3-padding-16">
                <a type="submit" href={GITHUB_AUTH_URL}>
                  <img
                    src={githubLogo}
                    className="social-btn__img"
                    alt="Github"
                  />{" "}
                  Log In with Github
                </a>
                <br/>(email이 공개인 경우만 사용 가능)
              </li>
              <li className="w3-light-grey w3-padding-24">
                Or{" "}
                <Link to="/signup">
                  <button className="w3-button w3-teal w3-padding-large w3-hover-black">
                    Sign Up!
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
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    const loginRequest = Object.assign({}, this.state);

    login(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        Alert.success("You're successfully logged in!", {
          timeout: 3000,
        });
        this.props.history.push("/");
      })
      .catch((error) => {
        Alert.error(
          (error && error.message) ||
            "Oops! Something went wrong. Please try again!",
          {
            timeout: 3000,
          }
        );
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
            Login
          </button>
        </div>
      </form>
    );
  }
}*/

export default UserLogin;
