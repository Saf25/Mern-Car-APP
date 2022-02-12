import React from "react";
import "./Home.css";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="bg-bg">
      <div className="container ">
        <h1>Our Mission: To&nbsp;Keep Your Car On&nbsp;the&nbsp;Road</h1>

        <div>Welcome to&nbsp;German Car Service!</div>
        <div className="btn_order-wrap btn-wrap">
          <br></br>
          <Button
            className="btn btn-warning"
            onClick={() => {
              if (isAuth) navigate("/profile");
              else navigate("/signup");
            }}
          >
            Schedule Service
          </Button>
        </div>
      </div>
      <div>
        <div>
          <h1 className="pos">How It works?</h1>
          <h6 className="pos1">1. Schedule a date after registering</h6>
          <h6 className="pos2">
            2. We will keep you informed about your next date
          </h6>
          <h6 className="pos3">
            3. Put the details of your next appointment on the profile Page
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Home;
