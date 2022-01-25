import React, { useState } from "react";
import auth from "../../../utils/helpers/auth";
import authApi from "../../../core/api/services/auth";

import { set_user_info } from "../../../redux/actions/user";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./style.scss";

const schema = yup.object().shape({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().min(8).max(32).required("Please enter your password"),
});
function SignUp() {
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

  const onFinish = (data) => {
    authApi
      .clientLogin(data)
      .then(({ info, access_token }) => {
        set_user_info(info, access_token);
        auth.setAuthInfo(info, access_token);
        console.log(info, access_token);
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          setError(e.response.data.message);
        }
      });

    reset();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="form-login-wrap">
      <div className="container-fluid">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onFinish)} className="login-form">
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

          <button type="submit" className="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
