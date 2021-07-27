import React from "react";
import axios from "axios";
import MyPlaylist from "../components/Playlist/MyPlaylist";
import "../components/Playlist/Playlist.css";

function Mypage({
  accessToken,
  userInfo,
  playlist,
  setCurrentVideo,
  setMode,
  setComments,
  setPlaylistPlayer,
  getPlaylist,
  setPlaylist,
}) {
  return (
    <div>
      <div className="profile-section">
        <div>
          <div className="profile-title">Profile</div>
          <hr></hr>
        </div>
        <div className="userinfo">
          <div className="profile-icon">
            <i class="fas fa-user-circle fa-5x"></i>
          </div>
          <div className="information">
            <div>
              <span className="name">Name</span>
              <span className="user-name">{userInfo.username}</span>
            </div>
            <div>
              <span className="name">Email</span>
              <span className="user-name">{userInfo.email}</span>
            </div>
          </div>
        </div>
      </div>
      <MyPlaylist
        playlist={playlist}
        accessToken={accessToken}
        setCurrentVideo={setCurrentVideo}
        setMode={setMode}
        setComments={setComments}
        setPlaylistPlayer={setPlaylistPlayer}
        getPlaylist={getPlaylist}
        setPlaylist={setPlaylist}
        userInfo={userInfo}
      />
    </div>
  );
}

export default Mypage;
