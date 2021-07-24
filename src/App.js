import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/Mypage";
import Nav from "./components/UI/Nav";
const axios = require("axios");

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [kakao, setKakao] = useState(false);

  useEffect(() => {
    handleLogin();
  }, [kakao]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAccessToken(localStorage.getItem("accessToken"));
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    }
  }, []);

  const handleLogin = () => {
    let code = new URL(window.location.href).searchParams.get("code");
    if (!code) {
      return;
    } else {
      axios
        .get(`http://localhost:4000/user/kakao?code=${code}`)
        .then((res) => {
          console.log("res : ", res);
          setAccessToken(res.data.accessToken);
          setUserInfo({
            username: res.data.dataValues.username,
            email: res.data.dataValues.email,
          });
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("userInfo", JSON.stringify(res.data.dataValues));
          window.location.href = "http://localhost:3000";
        })
        .catch((err) => {
          console.log(err);
          window.location.href = "http://localhost:3000";
        });
    }
  };

  const clickLogout = () => {
    axios
      .post("http://localhost:4000/user/logout", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }) //서버로 토큰 보내기
      .then((res) => {
        setAccessToken("");
        setUserInfo({});
        localStorage.clear();
      })
      .catch((e) => console.log(e));
  };

  return (
    <Router>
      <Nav
        setKakao={setKakao}
        accessToken={accessToken}
        clickLogout={clickLogout}
      />
      <Switch>
        <Route
          exact
          path="/"
          component={MainPage}
          accessToken={accessToken}
          userInfo={userInfo}
          playlist={playlist}
          setAccessToken={setAccessToken}
          setUserInfo={setUserInfo}
          setPlaylist={setPlaylist}
          setKakao={setKakao}
        />
        <Route exact path="/mypage" component={MyPage} />
      </Switch>
    </Router>
  );
}

export default App;
