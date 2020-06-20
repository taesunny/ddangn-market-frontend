import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";

function ProductListItem({
  id,
  name,
  img,
  category,
  price,
  description,
  region,
  status,
  createdTime,
}) {
  const imgStyle = {
    width: "250px",
    height: "250px",
    overflow: "hidden",
  };

  const contentStyle = {
    width: "900px",
    height: "265px",
  };

  const spanStyle = {
    float: "right",
  };

  const titleStyle = {
    float: "left",
  };

  const bottomStyle = {
    "verticalAlign": "bottom",
    "marginTop": "50px",
  };

  return (
    // <div className="product-list-item">
    //   <img src={productImg.path} alt={name} title={name} />
    //   <div className="product-list-item__data">
    //     <h3 className="product-list-item__name">???</h3>
    //     <h5 className="product-list-item__category">{category}</h5>
    //     <h5 className="product-list-item__price">{price}원</h5>
    //     <p className="product-list-item__description">{description.slice(0, 10)}...</p>
    //   </div>
    // </div>
    <Link to={`/products/${id}`}>
      <li style={contentStyle}>
        <img
          src={img}
          className="w3-left w3-margin-right"
          style={imgStyle}
          alt="product"
        />
        <span className="w3-large" style={titleStyle}>
          <h1 className="w3-hide-small">
            {name.slice(0, 30)}
            {name.length > 14 ? "..." : ""}
          </h1>
        </span>
        <br></br>
        <div style={bottomStyle}>
          <span style={spanStyle}>
            <Moment fromNow ago>
              {createdTime}
            </Moment>{" "}
            전 등록 됨
          </span>
          <br></br>
          <span style={spanStyle}>지역 : {region}</span>
          <br></br>
          <span style={spanStyle}>상태 : {status}</span>
          <br></br>
          <span style={spanStyle}>가격 : {price}원</span>
        </div>
      </li>
    </Link>
  );
}

ProductListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProductListItem;