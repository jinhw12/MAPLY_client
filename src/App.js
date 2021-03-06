import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Mypage from "./pages/Mypage";
import Nav from "./components/UI/Nav";
import history from "./utils/history";

const axios = require("axios");

axios.interceptors.response.use(function (res) {
  if (res.data.error_code === 401) {
    localStorage.clear();
    alert("토큰이 만료되었습니다. 다시 로그인 해주세요!");
    window.location.reload();
  }
  return res;
});

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [kakao, setKakao] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [mode, setMode] = useState("default");
  const [comments, setComments] = useState("");
  const [playlistPlayer, setPlaylistPlayer] = useState([]);
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

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

  const loginHandler = () => {
    kakaoLogin(KAKAO_LOGIN_URL);
  };
  const kakaoLogin = (url) => {
    try {
      setKakao(true);
      window.location.href = url;
    } catch (error) {
      console.log(error);
    }
  };
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
      .post(`${process.env.REACT_APP_SERVER_URL}/user/logout`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      .then(() => {
        setAccessToken("");
        setUserInfo({});
        localStorage.clear();
        history.push("/");
        window.location.reload();
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
    <Router history={history}>
      <Nav
        setKakao={setKakao}
        accessToken={accessToken}
        clickLogout={clickLogout}
        setMode={setMode}
        loginHandler={loginHandler}
      />
      <div className="wrapper-flex">
        <div className="page-container">
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
                loginHandler={loginHandler}
                setPlaylistPlayer={setPlaylistPlayer}
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
                getPlaylist={getPlaylist}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
