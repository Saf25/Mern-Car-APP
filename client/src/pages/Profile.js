import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./../slices/userSlice";
import Schedule from "../components/Calendar";
import { getEntries } from "./../slices/calendarSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getEntries());
  }, [dispatch]);

  return (
    <div className="cc">
      <div className="center">
        <p>{loading && <p>loading...</p>}</p>
        <h2 className="lobster">{`Welcome ${userInfo.name}`}</h2> <br></br>
        <h4 className="center lobster">
          {" "}
          Please Book an appointment car check date
        </h4>
        <br></br>
        <Schedule />
      </div>
    </div>
  );
};
export default Profile;
