import React, { Component } from "react";
import Moment from "react-moment";
import Alert from "react-s-alert";
import { getDefaultAxiosJsonConfig } from "../../utils/APIUtils";
import Axios from "axios";
import { API_BASE_URL } from "../../Const";
import keycloak from "../../keyclock";

class CommentListItem extends Component {
  deleteProductComments = async (commentId) => {
    try {
      const response = await Axios.delete(
        `${API_BASE_URL}/api/v1/products/${this.props.productId}/comments/${commentId}`,
        getDefaultAxiosJsonConfig()
      );

      console.log(`delete comment request response: ${response}`);
    } catch (e) {
      Alert.error("댓글 삭제 실패", {
        timeout: 5000,
      });

      console.log(`delete comment request failed: ${e}`);

      return;
    }

    Alert.success("댓글 삭제 완료!", {
      timeout: 3000,
    });

    this.props.reloadComments(true);
  };

  render() {
    const bottomStyle = {
      "verticalAlign": "center",
      "marginTop": "5px",
    };

    const {
      userEmail,
      createdTime,
      userId,
      content,
      id,
    } = this.props;

    return (
      <li>
        <span className="w3-large">
          <b>{userEmail} </b> 님이 의해{" "}
          <Moment fromNow ago>
            {createdTime}
          </Moment>{" "}
          전 등록 됨
          <button
            type="submit"
            className="w3-button w3-black w3-margin-left"
            disabled={keycloak.authenticated &&
              keycloak.userInfo &&
              keycloak.subject === userId ? false : true}
            onClick={() => this.deleteProductComments(id)}
          >
            <i className="fa fa-paper-plane w3-margin-center"></i>삭제
          </button>
        </span>
        <br></br>
        <div style={bottomStyle}>
          <span>{content}</span>
        </div>
      </li>
    );
  }
}

export default CommentListItem;
