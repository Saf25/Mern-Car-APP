import { React, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../App.css";
import { userschema } from "./yupSchemas";
import { useDispatch, useSelector } from "react-redux";
//chevauchement entre register ç pr ça registerAction
//regiter is predefenie par hookform
import { register as registerAction } from "./../slices/userSlice";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
//useEffect i need it when i open el site bech take those data
//en nheb when click ll register be done and not when page open

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userschema),
  });

  const dispatch = useDispatch();
  //redirection useNavigate
  const navigate = useNavigate();

  //star hedha mta3 5dhit isAuth mel user elli fel state
  //el user houni esm reducer
  const { isAuth } = useSelector((state) => state.user);

  //useEffect used psk ki yetbadel state make refresh
  //isAuth twali true haka yhezna toul lpage o8ra bel ReaRouterDOM
  //useEffect lehia bchnoua yssir fel refresh
  //isAuth njibha mel state donc useSelector
  useEffect(() => {
    if (isAuth) navigate("/profile");
  }, [isAuth, navigate]);

  const inputInfo = (data) => {
    dispatch(registerAction(data));
    //data hedhi hia elli jebtha mel input
    //kif bch dipatch data thezha lel serveur w ta3tik data ta3 serveur
  };
  return (
    <div className="rg">
      <header className="user__header">
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg"
          alt=""
        />
        <h1 className="user__title">Sign Up Here First</h1>
      </header>
      <br></br>
      <form className="form-register" onSubmit={handleSubmit(inputInfo)}>
        <div className="form__group">
          <label htmlFor="name">Name</label>
          <br></br>
          <div className="form__group">
            <input
              className="width5"
              id="name"
              type="text"
              {...register("name")}
            />
            <p>{errors.name?.message}</p>
          </div>

          <label htmlFor="userName">userName</label>
          <br></br>
          <div className="form__group">
            <input
              className="form__input width5"
              id="userName"
              type="text"
              {...register("userName")}
            />
            <p>{errors.userName?.message}</p>
          </div>

          <label htmlFor="email">E-Mail</label>
          <br></br>
          <div className="form__group">
            <input
              className="form__input width5"
              id="email"
              type="email"
              {...register("email")}
            />
            <p>{errors.email?.message}</p>
          </div>

          <label htmlFor="password">Password</label>
          <br></br>
          <div className="form__group">
            <input
              className="form__input width5"
              id="password"
              type="password"
              {...register("password")}
            />
            <p>{errors.password?.message}</p>
          </div>

          <input className="width1" type="submit" value="Create Account" />
        </div>
      </form>
    </div>
  );
};

export default Register;
