import React, { useState, useEffect } from "react";

function Login({ openLogin, setOpenLogin, setKakao }) {
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = "http://localhost:3000";
  const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  const kakaoLogin = (url) => {
    try {
      setKakao(true);
      window.location.href = url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`background ${openLogin ? "show" : ""}`}>
      <div
        className="login-signup-modal-outsider"
        onClick={() => setOpenLogin(false)}
      />
      <div className="login-signup-modal">
        <span className="login-close" onClick={() => setOpenLogin(false)}>
          X
        </span>
        <div className="login-title">LOGIN</div>
        <button>Google login</button>
        <div>
          <button onClick={() => kakaoLogin(KAKAO_LOGIN_URL)}>
            Kakao login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
