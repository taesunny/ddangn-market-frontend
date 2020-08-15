import React, { Component } from "react";
import "./ProductRegistration.css";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import Header from "../../layout/Header";
import Alert from "react-s-alert";
import { getDefaultAxiosFormDataConfig } from "../../utils/APIUtils";
import { API_BASE_URL } from "../../Const";
import { withKeycloak } from "@react-keycloak/web";

class ProductRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      category: "",
      image: "",
      price: 1000,
      region: "",
      categoryList: [],
      isLoading: true,
      registrationSuccess: false,
      selectedFile: null,
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

  handleFileInputChange(event) {
    console.log(event);

    this.setState({
      selectedFile: event.target.files[0],
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", this.state.selectedFile);

    const registrationDto = {
      title: this.state.title,
      content: this.state.content,
      price: this.state.price,
      category: this.state.category,
      region: this.state.region,
    };

    console.log("registrationDto: ", registrationDto);

    formData.append(
      "data",
      new Blob([JSON.stringify(registrationDto)], {
        type: "application/json",
      })
    );

    console.log(formData.get("image"));

    try {
      let response = await Axios.post(
        `${API_BASE_URL}/api/v1/products`,
        formData,
        getDefaultAxiosFormDataConfig()
      );
      // TODO: check result
      console.log("returned data: ", response);
    } catch (e) {
      Alert.error("상품 등록 실패", {
        timeout: 5000,
      });
      console.log(`Axios post request failed: ${e}`);
      return;
    }

    Alert.success("상품 등록 완료!", {
      timeout: 3000,
    });

    this.setState({ registrationSuccess: true });
  };

  renderRedirect = () => {
    if (this.state.registrationSuccess) {
      return (
        <Redirect
          to={{
            pathname: "/list",
            state: { from: this.props.location },
          }}
        />
      );
    }
  };

  getCategories = async () => {
    const data = await Axios.get(`${API_BASE_URL}/api/v1/categories`);
    console.log("val", data.data);
    this.setState({ categoryList: data.data, isLoading: false });
    console.log("values", this.state.categoryList);
  };

  componentDidMount() {
    this.getCategories();

    console.log("componentDisMount this.props: ", this.props);
  }

  render() {
    const { isLoading, categoryList } = this.state;

    const {keycloak, keycloakInitialized} = this.props;

    if(!keycloakInitialized) {
      return <h3>Loading ... !!!</h3>;
    }

    return (
      <div>
        <Header menuName="Register product" />
        <div class="w3-container w3-padding-large w3-light-grey">
          {this.renderRedirect()}
          <form onSubmit={this.handleSubmit}>
            <div class="w3-section">
              <label>Title</label>
              <input
                id="title"
                class="w3-input w3-border"
                type="text"
                name="title"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div class="w3-section">
              <label>Category</label>
              {isLoading ? (
                <select class="w3-select w3-border" name="category">
                  <option value="" disabled selected>
                    Category Loading
                  </option>
                </select>
              ) : (
                <select
                  id="category"
                  class="w3-select w3-border"
                  name="category"
                  onChange={this.handleInputChange}
                  required
                >
                  <option value="" disabled selected>
                    Choose product category
                  </option>
                  {categoryList.map((category) => (
                    <option value={category.name}>{category.name}</option>
                  ))}
                </select>
              )}
            </div>
            <div class="w3-section">
              <label>Region</label>
              <input
                id="region"
                class="w3-input w3-border"
                type="text"
                name="region"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div class="w3-section">
              <label>Price</label>
              <input
                id="price"
                class="w3-input w3-border"
                type="number"
                name="price"
                min="1000"
                max="99999999"
                step={500}
                onChange={this.handleInputChange}
                required
              />
              <p align="right">단위 : 원</p>
            </div>
            <div class="w3-section">
              <label>Image</label>
              <input
                id="image"
                class="w3-input w3-border"
                type="file"
                name="image"
                accept=".gif,.jpg,.jpeg,.png"
                multiple={false}
                onChange={(e) => this.handleFileInputChange(e)}
                required
              />
            </div>
            <div class="w3-section">
              <label>Content</label>
              <textarea
                id="content"
                class="w3-input w3-border product-registration__content"
                type="text"
                name="content"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <button class="w3-button w3-black w3-margin-bottom">
              <i class="fa fa-paper-plane w3-margin-center"></i>Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withKeycloak(ProductRegistration);
