import React, { Component } from "react";
import axios from "axios";
import Header from "../../layout/Header";
import Loading from "../../layout/Loading";
import { Redirect } from "react-router-dom";
import Moment from "react-moment";
import Alert from "react-s-alert";
import { getDefaultAxiosJsonConfig } from "../../utils/APIUtils";
import { API_BASE_URL } from "../../Const";
import { Link } from "react-router-dom";
import { withKeycloak } from "@react-keycloak/web";

class ProductDetail extends Component {
  constructor(props) {
    // super(props);
    super(props);
    this.state = {
      isLoading: true,
      product: [],
      deleteSuccess: false,
      isSelling: true,
      isregistrant: false,
    };

    this.deleteProduct = this.deleteProduct.bind(this);
    this.updateProductToSoldOut = this.updateProductToSoldOut.bind(this);
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

  getProduct = async () => {
    const { id } = this.props.match.params;

    // TODO: add try catch
    const { data: product } = await axios.get(
      `${API_BASE_URL}/api/v1/products/${id}`
    );

    if ("판매중" === product.status) {
      this.setState({ isSelling: true });
    } else {
      this.setState({ isSelling: false });
    }

    this.setState({ product, isLoading: false });
  };

  deleteProduct = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/v1/products/${this.state.product.id}`,
        getDefaultAxiosJsonConfig()
      );

      console.log(`delete request response: ${response}`);
    } catch (e) {
      Alert.error("상품 삭제 실패", {
        timeout: 5000,
      });

      console.log(`delete request failed: ${e}`);

      return;
    }

    Alert.success("상품 삭제 완료!", {
      timeout: 3000,
    });

    this.setState({ deleteSuccess: true });
  };

  renderRedirectToList = () => {
    if (this.state.deleteSuccess) {
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

  updateProductToSoldOut = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/v1/products/${this.state.product.id}?status=soldout`,
        {},
        getDefaultAxiosJsonConfig()
      );

      console.log(`update status to sold out request response: ${response}`);
    } catch (e) {
      Alert.error("상품 수정 실패", {
        timeout: 5000,
      });
      console.log(`update status to sold out request failed: ${e}`);
      return;
    }

    Alert.success("판매 완료 수정 완료!", {
      timeout: 3000,
    });

    this.getProduct();
  };

  componentDidMount() {
    this.getProduct();
  }

  render() {
    const { isLoading, product } = this.state;

    const imgStyle = {
      display: "block",
      margin: "auto",
      maxHeight: "500px",
      maxWidth: "900px",
    };

    const buttonListStyle = {
      textAlign: "right",
      marginRight: "30px",
    };

    const buttonStyle = {
      marginRight: "10px",
    };

    const { keycloak, keycloakInitialized } = this.props;

    console.log("product : ", product);
    console.log("keycloak : ", keycloak);
    console.log("this.props : ", this.props);

    if(!keycloakInitialized) {
      return <h3>Loading ... !!!</h3>;
    }

    return (
      <div>
        {this.renderRedirectToList()}
        <Header menuName="Product Detail"></Header>
        <div style={buttonListStyle}>
          {this.state.isSelling ? (
            <button
              className="w3-button w3-dark-grey w3-padding-large w3-margin-top w3-margin-bottom"
              style={buttonStyle}
              onClick={() => this.updateProductToSoldOut()}
              disabled={(keycloak && keycloak.subject) === product.userId ? false : true}
            >
              <i className="fa fa-download"></i>판매 완료 표시하기
            </button>
          ) : (
            <button
              className="w3-button w3-dark-grey w3-padding-large w3-margin-top w3-margin-bottom"
              style={buttonStyle}
              disabled
            >
              <i className="fa fa-download"></i>판매 완료
            </button>
          )}

          <button
            className="w3-button w3-dark-grey w3-padding-large w3-margin-top w3-margin-bottom"
            onClick={() => this.deleteProduct()}
            disabled={(keycloak && keycloak.subject) === product.userId ? false : true}
          >
            <i className="fa fa-download"></i>Delete Product
          </button>
        </div>
        <div className="w3-row">
          <section>
            {isLoading ? (
              <div>
                <Loading></Loading>
              </div>
            ) : (
              // <!-- !PAGE CONTENT! -->
              <div className="w3-container w3-padding-large">
                <img
                  src={`${API_BASE_URL}/api/v1/products/${this.state.product.id}/image`}
                  className="w3-image"
                  style={imgStyle}
                  alt="product"
                />
                <h4>
                  <b>{product.title}</b>
                </h4>
                <h5>Category: {product.category}</h5>
                <h5>Region: {product.region}</h5>
                <p align="right">
                  <b>{product.userEmail} </b> 님이 의해{" "}
                  <Moment fromNow ago>
                    {product.createdTime}
                  </Moment>{" "}
                  전 등록 됨
                </p>
                <p align="right">{product.status}</p>
                <p align="right">{product.price}원</p>
                <p>{product.content}</p>
              </div>
            )}
          </section>
        </div>
        <div className="w3-container w3-padding-large w3-light-grey">
          <h4 id="contact">
            <b>Chatting은 Login 후 사용 가능합니다.</b>
          </h4>
          <div>
            <Link to={`/products/${this.state.product.id}/chatting`}>
              <button
                type="submit"
                className="w3-button w3-black w3-margin-bottom"
                disabled={keycloak.authenticated ? false : true}
              >
                <i className="fa fa-paper-plane w3-margin-center">
                  Go to Chatting
                </i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withKeycloak(ProductDetail);
