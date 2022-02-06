import React, { useEffect, useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Home from "../../pages/Home/home";
import Menu from "../Menu";
import ProductList from "../../pages/ProductList";
import ProductDetails from "../../pages/ProductDetails";
import NotFound from "../NotFound";
import Cart from "../../pages/Cart";
import SignIn from "../../pages/Authentication/SignIn";
import SignUp from "../../pages/Authentication/SignUp";
import Checkout from "../../pages/Checkout";
import BlogList from "../../pages/BlogList";
import WishList from "../../pages/WishList";
import Profile from "../../pages/Profile";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { GuardSpinner } from "react-spinners-kit";
import "./style.scss";
const LayoutDefault = () => {
  const cart = useSelector((state) => state.cart);

  const wishList = useSelector((state) => state.wl);
  const [user, setUser] = useState();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    }
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const topRef = useRef(null);
  console.log("top ref", topRef);
  const handleClickToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [top, setTop] = useState({ scrollTop: 0 });
  const scrollToTop = () => {
    const scrollY = window.scrollY; //Don't get confused by what's scrolling - It's not the window
    const scrollTop = topRef.current.scrollTop;
    console.log(
      `onScroll, window.scrollY: ${scrollY} myRef.scrollTop: ${scrollTop}`
    );
    setTop({
      scrollTop: scrollTop,
    });
  };

  return (
    <>
      <div className="layout-default">
        {loading === false ? (
          <>
            <Header user={user} />
            <Menu />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:id" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart cart={cart} />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/blog" element={<BlogList />} />
              <Route
                path="/wishlist"
                element={<WishList wishList={wishList} />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
            <div
              className="top-btn"
              ref={topRef}
              onClick={(e) => handleClickToTop(e)}
              onScroll={(e) => scrollToTop(e)}
            >
              <i className="fas fa-arrow-up"></i>
            </div>
          </>
        ) : (
          <div className="loading-page">
            <GuardSpinner
              size={100}
              color="#00ff89"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            />
            <h2 data-text="Loading...">Loading...</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default LayoutDefault;