import React, { useState } from "react";
import auth from "../../../utils/helpers/auth";
import authApi from "../../../core/api/services/auth";
import { Link } from "react-router-dom";
import { set_user_info } from "../../../redux/actions/user";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { useNavigate } from "react-router";
import * as yup from "yup";
import "./style.scss";

const schema = yup.object().shape({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().min(8).max(32).required("Please enter your password"),
});
function SignIn(props) {
  const { firebase } = props;
  console.log("fire base auth", firebase.configuration);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
      setValue(e.target.value);
    };
    return {
      value,
      onChange: handleChange,
    };
  };

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleLogin = async () => {
    const { firebase } = props;
    await firebase
      .login({
        email: "khang251099@gmail.com",
        password: "Khang@2510",
      })

      .then((authenticatedUser) => {
        console.log(authenticatedUser);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <div className="form-login-wrap">
      <div className="container-fluid">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <br />
          <input
            {...register("email")}
            placeholder="example@gmail.com"
            type="email"
          />
          <p className="error-message">{errors.email?.message}</p>
          <br />
          <label>Password</label>
          <br />
          <input
            {...register("password")}
            placeholder="password"
            type="password"
          />
          <p className="error-message">{errors.password?.message}</p>
          <br />
          <p className="text-already-account">
            If you dont have account, register in
            <strong>
              <Link to="/signup"> here </Link>
            </strong>
          </p>
          <button
            type="submit"
            className="submit"
            onClick={() => handleLogin()}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default compose(
  firebaseConnect() //gọi để connect vs firebase và cho phép ánh xạ thuộc tính firebase trong props
)(SignIn);
