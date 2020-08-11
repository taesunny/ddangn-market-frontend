import React from "react";
import axios from "axios";
import ProductListItem from "./ProductListItem";
import Header from "../../layout/Header";
import Loading from "../../layout/Loading";
import { API_BASE_URL } from "../../Const";
import { TalkBox } from "react-talk";
import SockJsClient from "react-stomp";
import keycloak from "../../keyclock";
import {
  CHATTING_SERVER_BASE_URL,
  CHATTING_SERVER_WEB_SOCKET_URL,
} from "../../ChattingConst";
import { getDefaultAxiosJsonConfig, getDefaultHeaderWithAuthorization } from "../../utils/APIUtils";

class ProductChatting extends React.Component {
  state = {
    isLoading: true,
    clientConnected: false,
    messages: [],
    // productList: [],
    productName: "Loading...",
  };

  getChattingHistory = async () => {
    const { id } = this.props.match.params;
    const { data: messages } = await axios.get(
      `${CHATTING_SERVER_BASE_URL}/products/${id}/history`,
      getDefaultAxiosJsonConfig()
    );

    // console.log("return: ", products);
    // console.log(products);
    this.setState({ isLoading: false, messages: messages });
  };

  sendMessage = (msg, selfMsg) => {
    const { id } = this.props.match.params;

    try {
      var send_message = {
        productId: id,
        messageType: "TALK",
        message: selfMsg.message,
      };
      this.clientRef.sendMessage(
        "/pub/chat/message",
        JSON.stringify(send_message)
      );
      return true;
    } catch (e) {
      return false;
    }
  };

  onMessageReceive = (msg, topic) => {
    //alert(JSON.stringify(msg) + " @ " +  JSON.stringify(this.state.messages)+" @ " + JSON.stringify(topic));
    this.setState((prevState) => ({
      messages: [...prevState.messages, msg],
    }));
  };

  getProduct = async () => {
    const { id } = this.props.match.params;

    // TODO: add try catch
    const { data: product } = await axios.get(
      `${API_BASE_URL}/api/v1/products/${id}`
    );

    this.setState({ productName: product.title });
  };

  componentDidMount() {
    this.getChattingHistory();
    this.getProduct();

    console.log("Lnb : ", keycloak);
  }

  render() {
    // console.log("product List : ", productList);
    const { id } = this.props.match.params;
    var TOPIC_SUB_URL = `/sub/chat/product/${id}`;

    return (
      <div>
        <Header menuName="Product Chatting"></Header>
        <div className="w3-row">
          <section>
            <div>
              <TalkBox
                topic={"'Hi' 문자를 입력 후 enter를 눌러 시작하세요!"}
                currentUserId={
                  keycloak.authenticated &&
                  keycloak.userInfo &&
                  keycloak.subject
                }
                currentUser={
                  keycloak.authenticated &&
                  keycloak.userInfo &&
                  keycloak.subject
                }
                messages={this.state.messages}
                onSendMessage={this.sendMessage}
                connected={this.state.clientConnected}
              />

              <SockJsClient
                url={CHATTING_SERVER_WEB_SOCKET_URL}
                topics={[TOPIC_SUB_URL]}
                onMessage={this.onMessageReceive}
                headers={getDefaultHeaderWithAuthorization()}
                ref={(client) => {
                  this.clientRef = client;
                }}
                onConnect={() => {
                  this.setState({ clientConnected: true });
                }}
                onDisconnect={() => {
                  this.setState({ clientConnected: false });
                }}
                debug={false}
                style={[{ width: "100%", height: "100%" }]}
              />
            </div>
          </section>
        </div>
        <div>{/* <Pager></Pager> */}</div>
      </div>
    );
  }
}

export default ProductChatting;
