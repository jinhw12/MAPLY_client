import React, { useState, useEffect } from "react";
import SearchVideo from "../components/UI/SearchVideo";
import VideoList from "../components/UI/VideoList";
import VideoPlayer from "../components/UI/VideoPlayer";
import TrendVideoList from "../components/UI/TrendVideoList";

function MainPage({
  accessToken,
  playlist,
  userInfo,
  setAccessToken,
  setPlaylist,
  setUserInfo,
  setKakao,
  getPlaylist,
  currentVideo,
  setCurrentVideo,
  mode,
  setMode,
  comments,
  setComments,
}) {
  const [searchedVideo, setSearchedVideo] = useState("");

  return (
    <>
      <div className="main-img"></div>
      <SearchVideo setSearchedVideo={setSearchedVideo} setMode={setMode} />
      {mode === "play" ? (
        <VideoPlayer
          currentVideo={currentVideo}
          comments={comments}
          searchedVideo={searchedVideo}
          setCurrentVideo={setCurrentVideo}
          setComments={setComments}
          setMode={setMode}
          playlist={playlist}
          setPlaylist={setPlaylist}
          userInfo={userInfo}
          getPlaylist={getPlaylist}
          accessToken={accessToken}
        />
      ) : mode === "search" ? (
        <VideoList
          searchedVideo={searchedVideo}
          setCurrentVideo={setCurrentVideo}
          setMode={setMode}
          mode={mode}
          setComments={setComments}
        />
      ) : (
        <TrendVideoList
          setCurrentVideo={setCurrentVideo}
          setMode={setMode}
          setComments={setComments}
        />
      )}
    </>
  );
}

export default MainPage;
