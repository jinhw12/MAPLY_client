import React from "react";
import axios from "axios";
import MyPlaylist from "../components/Playlist/MyPlaylist";

function Mypage({
  accessToken,
  userInfo,
  playlist,
  setCurrentVideo,
  setMode,
  setComments,
  setPlaylistPlayer,
}) {
  return (
    <div>
      <div>MY PAGE</div>
      <hr></hr>
      <div className="userinfo">
        <div>
          <span>username</span>
          <span>{userInfo.username}</span>
        </div>
        <div>
          <span>email</span>
          <span>{userInfo.email}</span>
        </div>
      </div>
      <MyPlaylist
        playlist={playlist}
        accessToken={accessToken}
        setCurrentVideo={setCurrentVideo}
        setMode={setMode}
        setComments={setComments}
        setPlaylistPlayer={setPlaylistPlayer}
      />
    </div>
  );
}

export default Mypage;
