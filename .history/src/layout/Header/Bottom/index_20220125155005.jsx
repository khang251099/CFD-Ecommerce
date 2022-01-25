import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../../assets/images/logo.png";
import login from "../../../assets/icons/user.svg";
import heart from "../../../assets/icons/wishList.svg";
import Search from "../../Search";
import { Link } from "react-router-dom";

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

  const open = useRef(null);
  console.log("open", open.current);
  function openNav(e) {
    open.current.style.width = "250px";
  }
  function closeNav() {
    open.current.style.width = "0";
  }

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
        <div>
          {_.isEmpty(user) ? (
            <div className="login" style={{ marginLeft: "40px" }}>
              <Link to="/login">
                <img src={login} alt="login" />
              </Link>
            </div>
          ) : (
            <>
              <div id="mySidenav" class="sidenav" ref={open}>
                <a
                  href="javascript:void(0)"
                  class="closebtn"
                  onClick={(e) => closeNav(e)}
                >
                  &times;
                </a>
                <a href="#">Profile</a>
                <a href="#">Sign Out</a>
              </div>
              <span onClick={(e) => openNav(e)}>
                <p className="say-hi">Chào {user._delegate.email}</p>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
