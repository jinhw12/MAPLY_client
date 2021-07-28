import React, { useState } from "react";
import Login from "../User/Login";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logo from "../../images/maply_logo.png";
import "./UI.css";

function Nav({ setKakao, accessToken, clickLogout, setMode, loginHandler }) {
  const history = useHistory();

  const clickHome = () => {
    history.push("/");
    setMode("default");
  };

  return (
    <div className="nav-container">
      <img className="nav-logo" src={logo} onClick={() => history.push("/")} />
      <div className="nav-btn-container">
        <button className="nav-btn green" onClick={clickHome}>
          Home
        </button>
        {accessToken.length > 0 ? (
          <button
            className="nav-btn yellow"
            onClick={() => history.push("/mypage")}
          >
            Mypage
          </button>
        ) : (
          <></>
        )}
        {accessToken.length > 0 ? (
          <button className="nav-btn red" onClick={clickLogout}>
            Logout
          </button>
        ) : (
          <span className="nav-btn yellow" onClick={loginHandler}>
            <i class="fas fa-comment" />
            Login
          </span>
        )}
      </div>
      {/* <Login
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}
        setKakao={setKakao}
      /> */}
    </div>
  );
}

export default Nav;
