import React, { useState } from "react";
import Login from "../User/Login";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
    <>
      <button onClick={clickHome}>HOME</button>
      {accessToken.length > 0 ? (
        <button onClick={() => history.push("/mypage")}>Mypage</button>
      ) : (
        <></>
      )}
      <button onClick={accessToken.length > 0 ? clickLogout : clickLogin}>
        {accessToken.length > 0 ? "Logout" : "Login"}
      </button>
      <Login
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}
        setKakao={setKakao}
      />
    </>
  );
}

export default Nav;
