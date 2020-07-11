import React, { Component } from "react";
import "./AppPushRegistration.css";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import Header from "../../layout/Header";
import Alert from "react-s-alert";
import { getDefaultAxiosJsonConfig } from "../../utils/APIUtils";
import { APP_SERVER_API_BASE_URL } from "../../Const";

class AppPushRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type: "",
      message: "",
    };

    console.log("constructor props: ", props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const registrationDto = {
      title: this.state.title,
      type: this.state.type,
      message: this.state.message,
    };

    try {
      let response = await Axios.post(
        `${APP_SERVER_API_BASE_URL}/api/v1/notifications`,
        registrationDto,
        getDefaultAxiosJsonConfig()
      );
      // TODO: check result
      console.log("returned data: ", response);
    } catch (e) {
      Alert.error("App Push 등록 실패", {
        timeout: 5000,
      });
      console.log(`Axios post request failed: ${e}`);
      return;
    }

    Alert.success("App Push 등록 완료!", {
      timeout: 3000,
    });

    this.setState({ registrationSuccess: true });
  };

  renderRedirect = () => {
    if (this.state.registrationSuccess) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: this.props.location },
          }}
        />
      );
    }
  };

  componentDidMount() {
    console.log("componentDisMount this.props: ", this.props);
  }

  render() {
    return (
      <div>
        <Header menuName="Register App Push" />
        <div className="w3-container w3-padding-large w3-light-grey">
          {this.renderRedirect()}
          <form onSubmit={this.handleSubmit}>
            <div className="w3-section">
              <label>Type</label>
              <select
                id="type"
                className="w3-select w3-border"
                name="type"
                onChange={this.handleInputChange}
                required
              >
                <option value="" disabled selected>
                  Choose product category
                </option>
                <option value="공지">공지</option>
                <option value="광고">광고</option>
              </select>
            </div>
            <div className="w3-section">
              <label>Title</label>
              <input
                id="title"
                className="w3-input w3-border"
                type="text"
                name="title"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="w3-section">
              <label>Message</label>
              <input
                id="message"
                className="w3-input w3-border"
                type="text"
                name="message"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <button className="w3-button w3-black w3-margin-bottom">
              <i className="fa fa-paper-plane w3-margin-center"></i>Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AppPushRegistration;
