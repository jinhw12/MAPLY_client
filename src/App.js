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
  const [currentVideo, setCurrentVideo] = useState("");
  const [mode, setMode] = useState("default");
  const [comments, setComments] = useState("");
  const [playlistPlayer, setPlaylistPlayer] = useState([]);

  useEffect(() => {
    clickLogin();
  }, [kakao]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAccessToken(localStorage.getItem("accessToken"));
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      getPlaylist();
    }
  }, [userInfo]);

  const clickLogin = async () => {
    let code = new URL(window.location.href).searchParams.get("code");
    if (!code) {
      return;
    } else {
      const kakaoRes = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/user/kakao?code=${code}`
      );
      const { id, username, email, accessToken } = kakaoRes.data.dataValues;
      handleLogin(id, username, email, accessToken);
    }
  };

  const handleLogin = (id, username, email, accessToken) => {
    setAccessToken(accessToken);
    setUserInfo({ id, username, email });
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userInfo", JSON.stringify({ id, username, email }));
    window.history.pushState(null, null, "/");
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

  const getPlaylist = async () => {
    const playList = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/playlist/${userInfo.id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );
    setPlaylist(playList.data);
    console.log("get playlist : ", playList.data);
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
            currentVideo={currentVideo}
            setCurrentVideo={setCurrentVideo}
            mode={mode}
            setMode={setMode}
            comments={comments}
            setComments={setComments}
            playlistPlayer={playlistPlayer}
          />
        </Route>
        <Route path="/mypage">
          <Mypage
            accessToken={accessToken}
            userInfo={userInfo}
            playlist={playlist}
            setCurrentVideo={setCurrentVideo}
            setMode={setMode}
            setComments={setComments}
            setPlaylistPlayer={setPlaylistPlayer}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
