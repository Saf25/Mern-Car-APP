import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/userSlice";
import { Nav } from "react-bootstrap";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navvbar = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else setShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        console.log("");
      });
    };
  }, []);
  const { isAuth } = useSelector((state) => state.user);
  return (
    <Nav id="fixed" className={`nav ${show && "nav__scroll"}`}>
      <a href="/">
        <img
          className="nav__logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEh_mU75nrj1Z15eLxRgdPnCBLKh9lmjtkDg&usqp=CAU"
          alt="GCS LOGO"
        />
      </a>
      <div
        className={`nav__container nav__borderXwidth ${
          show && "nav__containerscroll nav__borderXwidthscroll"
        }`}
      >
        <Link className={`nav__link ${show && "nav__linkscroll"}`} to="/">
          Home
        </Link>
        {!isAuth ? (
          <>
            <Link
              className={`nav__link ${show && "nav__linkscroll"}`}
              to="/signIn"
            >
              SignIn
            </Link>
            <Link
              className={`nav__link ${show && "nav__linkscroll"}`}
              to="/signUp"
            >
              SignUp
            </Link>
          </>
        ) : (
          <>
            <Link
              className={`nav__link ${show && "nav__linkscroll"}`}
              to="/"
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(logout())}
            >
              Logout
            </Link>
            <Link
              className={`nav__link ${show && "nav__linkscroll"}`}
              to="/profile"
            >
              Profile/Schedule
            </Link>
            <Link
              className={`nav__link ${show && "nav__linkscroll"}`}
              to="/posts"
            >
              My Cars
            </Link>
          </>
        )}

        <Link
          to="/contactus"
          className={`nav__link ${show && "nav__linkscroll"}`}
        >
          Contact Us
        </Link>
      </div>
    </Nav>
  );
};
export default Navvbar;
