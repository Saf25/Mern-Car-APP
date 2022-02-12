import React, { useEffect } from "react";
import "../App.css";
import { useForm } from "react-hook-form";
//psk 7achti bel errors elli fel state mta3 rehjected dc useSelector
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

//register and handlesubmit are already predefined by hookform
const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginInput = (data) => {
    dispatch(login(data));
  };
  //nejbdou zouz mel state errors w isAuth
  const { errors, isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuth) navigate("/profile");
  }, [isAuth, navigate]);
  return (
    <div>
      <form className="top">
        <label htmlFor="email">E-Mail:</label>
        <br></br>
        <input
          className="width1"
          id="email"
          type="email"
          name="email"
          {...register("email")}
        />
        <br></br>

        <label htmlFor="password">Password:</label>
        <br></br>
        <input
          className="width1"
          id="password"
          type="password"
          name="password"
          {...register("password")}
        />
        <br></br>
        {errors && <p>{errors.msg}</p>}
        <br></br>
        <input
          className="width"
          onClick={handleSubmit(loginInput)}
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
};

export default Login;
