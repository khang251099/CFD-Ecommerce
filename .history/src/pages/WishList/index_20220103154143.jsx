import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

WishList.propTypes = {};

function WishList(props) {
  return (
    <div className="container-fluid">
      <div className="wishList__item-wrap">
        <h2 className="title">My Wish List</h2>
      </div>
    </div>
  );
}

export default WishList;
