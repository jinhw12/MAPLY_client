import React, { useState } from "react";
import Login from "../User/Login";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logo from "../../images/maply_logo.png";
import "./UI.css";

function Nav({ setKakao, accessToken, clickLogout, setMode }) {
  const history = useHistory();
  const [openLogin, setOpenLogin] = useState(false);

  const clickLogin = () => {
    setOpenLogin(true);
  };
  const clickHome = () => {
    history.push("/");
    setMode("default");
  };

  return (
    <div className="nav-container">
      <img className="nav-logo" src={logo} onClick={() => history.push("/")} />
      <div className="nav-btn-container">
        <button className="nav-btn yellow" onClick={clickHome}>
          HOME
        </button>
        {accessToken.length > 0 ? (
          <button
            className="nav-btn green"
            onClick={() => history.push("/mypage")}
          >
            Mypage
          </button>
        ) : (
          <></>
        )}
        <button
          className={`nav-btn ${accessToken.length > 0 ? "red" : "green"}`}
          onClick={accessToken.length > 0 ? clickLogout : clickLogin}
        >
          {accessToken.length > 0 ? "Logout" : "Login"}
        </button>
      </div>
      <Login
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}
        setKakao={setKakao}
      />
    </div>
  );
}

export default Nav;
