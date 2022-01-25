import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../../assets/images/logo.png";
import login from "../../../assets/icons/user.svg";
import heart from "../../../assets/icons/wishList.svg";
import Search from "../../Search";
//Material
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import _ from "lodash";

import productApi from "../../../core/api/product";
import { Link } from "react-router-dom";
import "./style.scss";
// import "./dropdown";

const HeaderBottom = (props) => {
  const { user } = props;
  const [data, setData] = useState([]);
  console.log(user);
  // console.log("user", user._delegate.email);
  const trigger = (e) => {
    e.target.classList.add("active");
  };
  const dropdown = (e) => {
    e.target.classList.remove("active");
  };
  useEffect(() => {
    try {
      const fetchData = async () => {
        const productList = await productApi.getAll();
        setData(productList);
      };
      fetchData();
    } catch (error) {
      console.log("failed to fetch data", error);
    }
  }, []);

  const [navBar, setNavBar] = useState(false);

  const handleNavBar = () => {
    setNavBar(!navBar);
  };

  return (
    <div className="header__item-wrap --bottom">
      <div className="header__item --logo">
        <Link to="/">
          <img
            src={logo}
            alt="LOGO"
            style={{ width: "177px", height: "18px" }}
          />
          <h1 className="hidden">Freshnesecom</h1>
        </Link>
      </div>
      <Search details={data} />
      <div className="header__item --func">
        <div className="wish-list">
          <Link to="/wishlist">
            <img src={heart} alt="wish-list" />
          </Link>
        </div>

        {/* <div className="login" style={{ marginLeft: "40px" }}>
          <Link to="/login">
            <img src={login} alt="login" />
          </Link>
        </div> */}
        <input id="check01" type="checkbox" name="menu" />
        <label for="check01">Dropdown...</label>
        <ul class="submenu">
          <li>
            <a href="#">First Item</a>
          </li>
          <li>
            <a href="#">Second Item</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderBottom;
