import React, { useState, useEffect } from "react";
import SearchVideo from "../components/UI/SearchVideo";
import VideoList from "../components/UI/VideoList";
import VideoPlayer from "../components/UI/VideoPlayer";
import TrendVideoList from "../components/UI/TrendVideoList";

function MainPage({
  accessToken,
  playlist,
  userInfo,
  setPlaylist,
  getPlaylist,
  currentVideo,
  setCurrentVideo,
  mode,
  setMode,
  comments,
  setComments,
  playlistPlayer,
  loginHandler,
  setPlaylistPlayer,
}) {
  const [searchedVideo, setSearchedVideo] = useState("");
  const [trendVideoPlayer, setTrendVideoPlayer] = useState([]);

  return (
    <>
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
          playlistPlayer={playlistPlayer}
          trendVideoPlayer={trendVideoPlayer}
          loginHandler={loginHandler}
        />
      ) : mode === "search" ? (
        <VideoList
          searchedVideo={searchedVideo}
          setCurrentVideo={setCurrentVideo}
          setMode={setMode}
          mode={mode}
          setComments={setComments}
          setPlaylistPlayer={setPlaylistPlayer}
          setTrendVideoPlayer={setTrendVideoPlayer}
        />
      ) : (
        <TrendVideoList
          setCurrentVideo={setCurrentVideo}
          setMode={setMode}
          setComments={setComments}
          setTrendVideoPlayer={setTrendVideoPlayer}
          setSearchedVideo={setSearchedVideo}
          setPlaylistPlayer={setPlaylistPlayer}
        />
      )}
    </>
  );
}

export default MainPage;
