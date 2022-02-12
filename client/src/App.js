import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ContactUs from "./pages/Contact";
import Navvbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Post from "./pages/Post";
import "react-calendar/dist/Calendar.css";
import LogRocket from "logrocket";

LogRocket.init("wr7jwf/my-app");
function App() {
  return (
    <div>
      <Navvbar></Navvbar>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/signIn" element={<Login />}></Route>
        <Route path="/signUp" element={<Register />}></Route>

        <Route element={<PrivateRoute />}>
          <Route path="/posts" element={<Post />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
        <Route path="/contactus" element={<ContactUs />}></Route>
      </Routes>
    </div>
  );
}
//the privateRoute is specific to the user whith creating a nested route
export default App;
