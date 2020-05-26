import React, { Component } from "react";
import axios from "axios";
import Header from "../../layout/Header";
import Loading from "../../layout/Loading";
import { Redirect } from "react-router-dom";
import Moment from "react-moment";
import Alert from "react-s-alert";
import { getDefaultAxiosJsonConfig } from "../../utils/APIUtils";
import CommentListItem from "./CommentListItem";
import Axios from "axios";
import { API_BASE_URL } from "../../Const";

class ProductDetail extends Component {
  constructor(props) {
    // super(props);
    super(props);
    this.state = {
      isLoading: true,
      product: [],
      deleteSuccess: false,
      isSelling: true,
      comments: [],
      isCommentLoading: true,
      refreshComments: false,
      newComment: "",
    };

    this.deleteProduct = this.deleteProduct.bind(this);
    this.updateProductToSoldOut = this.updateProductToSoldOut.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.reloadComments = this.reloadComments.bind(this);
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

  getProductComments = async () => {
    const { id } = this.props.match.params;

    // TODO: add try catch
    const { data: comments } = await axios.get(
      `${API_BASE_URL}/api/v1/products/${id}/comments`
    );

    console.log("comments: ", comments);

    this.setState({ comments, isCommentLoading: false });
  };

  reloadComments = () => {
    if (this.state.refreshComments) {
      this.getProductComments();
      this.setState({ refreshComments: false });
    }
  };

  reloadCommentsCallback = (success) => {
    if (success) {
      this.setState({ refreshComments: true });
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

  handleCommentSubmit = async (event) => {
    event.preventDefault();

    const registrationDto = {
      content: this.state.newComment,
    };

    console.log("registrationDto: ", registrationDto);

    try {
      let response = await Axios.post(
        `${API_BASE_URL}/api/v1/products/${this.state.product.id}/comments`,
        registrationDto,
        getDefaultAxiosJsonConfig()
      );
      console.log("returned data: ", response);
    } catch (e) {
      Alert.error("댓글 등록 실패", {
        timeout: 5000,
      });
      console.log(`Axios post request failed: ${e}`);
      return;
    }

    Alert.success("댓글이 등록 되었습니다.", {
      timeout: 5000,
    });

    this.setState({ refreshComments: true, newComment: "" });
  };

  componentDidMount() {
    this.getProduct();
    this.getProductComments();
  }

  render() {
    const { isLoading, product, comments } = this.state;

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

    console.log("product : ", product);
    console.log("this.props : ", this.props);

    return (
      <div>
        {this.renderRedirectToList()}
        {this.reloadComments()}
        <Header menuName="Product Detail"></Header>
        <div style={buttonListStyle}>
          {this.state.isSelling ? (
            <button
              className="w3-button w3-dark-grey w3-padding-large w3-margin-top w3-margin-bottom"
              style={buttonStyle}
              onClick={() => this.updateProductToSoldOut()}
              disabled={
                this.props.currentUser &&
                this.props.currentUser.id === product.userId
                  ? false
                  : true
              }
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
            disabled={
              this.props.currentUser &&
              this.props.currentUser.id === product.userId
                ? false
                : true
            }
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
                  src={product.imageFilePath}
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
            <b>Comment</b>
          </h4>

          <form onSubmit={this.handleCommentSubmit}>
            <div className="w3-section">
              <input
                id="newComment"
                className="w3-input w3-border"
                type="text"
                name="newComment"
                maxLength="100"
                value={this.state.newComment}
                placeholder={
                  this.props.currentUser
                    ? "댓글을 작성해 주세요"
                    : "로그인 후 댓글을 작성할 수 있습니다."
                }
                required
                onChange={this.handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="w3-button w3-black w3-margin-bottom"
              disabled={this.props.currentUser ? false : true}
            >
              <i className="fa fa-paper-plane w3-margin-center"></i>등록
            </button>
          </form>
          <hr className="w3-opacity" />
          <div>
            {comments.length === 0 ? "No Comments" : ""}
            <ul className="w3-ul w3-hoverable">
              {comments.map((comment) => (
                <CommentListItem
                  key={comment.id}
                  id={comment.id}
                  productId={product.id}
                  userEmail={comment.userEmail}
                  userId={comment.userId}
                  content={comment.content}
                  createdTime={comment.createdTime}
                  currentUserId={
                    this.props.currentUser ? this.props.currentUser.id : -1
                  }
                  reloadComments={this.reloadCommentsCallback}
                />
              ))}
              <hr className="w3-opacity" />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
