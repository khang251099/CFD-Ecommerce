import React from "react";
import PagnationContent from "../../../../componens/Pagnation";
import moreProducts from "../../../../assets/icons/more-products.svg";
import "./style.scss";


const MainBottom = (props) => {
  return (
    <div className="main-bottom">
      {/* <label>Page</label> */}
      <div
        className="pagination-wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontFamily: "Open Sans", fontize: "12px" }}>Page</p>
        <PagnationContent />{" "}
      </div>

      <div className="btn-show-more">
        <a href="#">
          <p>Show more products </p>
          <img src={moreProducts} alt="" />
        </a>
      </div>
      <div className="main-bottom-right">
        <div
          className="text-small"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            className="text"
            style={{
              fontSize: "12px",
              color: " #ffff",
              fontFamily: "Poppins",
              fontWeight: 600,
              color: "#A9A9A9",
            }}
          >
            117
          </span>
        </div>
        <a href="#">
          <p>Products</p>
        </a>
      </div>
    </div>
  );
}

export default MainBottom;
