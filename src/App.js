import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Mypage from "./pages/Mypage";
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
        .get(`${process.env.REACT_APP_SERVER_URL}/user/kakao?code=${code}`)
        .then((res) => {
          const { id, username, email } = res.data.dataValues;
          setAccessToken(res.data.accessToken);
          setUserInfo({
            id,
            username,
            email,
          });
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("userInfo", JSON.stringify(res.data.dataValues));
          window.history.pushState(null, null, "/");
          return { id, accessToken: res.data.accessToken };
        })
        .then((data) => {
          getPlaylist(data.id, data.accessToken);
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
        withCredentials: true,
      })
      .then(() => {
        setAccessToken("");
        setUserInfo({});
        localStorage.clear();
      })
      .catch((e) => console.log(e));
  };

  const getPlaylist = (userId, accessToken2) => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/playlist/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken2}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("get playlist : ", res.data);
        setPlaylist(res.data);
      });
  };

  return (
    <Router>
      <Nav
        setKakao={setKakao}
        accessToken={accessToken}
        clickLogout={clickLogout}
      />
      <Switch>
        <Route exact path="/">
          <MainPage
            accessToken={accessToken}
            userInfo={userInfo}
            playlist={playlist}
            setAccessToken={setAccessToken}
            setUserInfo={setUserInfo}
            setPlaylist={setPlaylist}
            setKakao={setKakao}
            getPlaylist={getPlaylist}
          />
        </Route>
        <Route path="/mypage">
          <Mypage
            accessToken={accessToken}
            userInfo={userInfo}
            playlist={playlist}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
