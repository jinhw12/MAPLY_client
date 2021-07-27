import React, { useState } from "react";
import Login from "../User/Login";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logo from "../../images/maply_logo.png";
import "./UI.css";

function Nav({ setKakao, accessToken, clickLogout, setMode }) {
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = "http://localhost:3000";
  const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  const history = useHistory();
  // const [openLogin, setOpenLogin] = useState(false);

  const clickLogin = () => {
    kakaoLogin(KAKAO_LOGIN_URL);
  };

  const clickHome = () => {
    history.push("/");
    setMode("default");
  };

  const kakaoLogin = (url) => {
    try {
      setKakao(true);
      window.location.href = url;
    } catch (error) {
      console.log(error);
    }
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
        {
          accessToken.length > 0 ?
            <button
              className="nav-btn red"
              onClick={clickLogout}>
              Logout
            </button>
            :
            <span className="nav-btn yellow" onClick={clickLogin}><i class="fas fa-comment" />Login</span>
        }
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
