import React, { useState } from "react";
import axios from "axios";
import EachPlaylist from "../components/Playlist/EachPlaylist";
import EachMyVideo from "../components/Playlist/EachMyVideo";
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
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [currentPlaylistInfo, setCurrentPlaylistInfo] = useState("");
  const [checkedPlaylist, setCheckedPlaylist] = useState([]);
  const [showCheckbox, setShowCheckbox] = useState(false);

  const handleCheckedPlaylist = (isChecked, id) => {
    if (isChecked) {
      setCheckedPlaylist(checkedPlaylist.concat(id));
    } else {
      setCheckedPlaylist(checkedPlaylist.filter((el) => el !== id));
    }
  };

  const deletePlaylist = () => {
    checkedPlaylist.forEach((id) => {
      axios
        .delete(`${process.env.REACT_APP_SERVER_URL}/playlist/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log("delete playlist : ", res);
          getPlaylist();
          setShowCheckbox(false);
          setCurrentPlaylist([]);
        });
    });
  };

  return (
    <div>
      <div className="profile-section">
        <div>
          <div className="profile-title">Profile</div>
          <hr></hr>
        </div>
        <div className="userinfo">
          <div className="profile-icon">
            <i class="fas fa-user-circle fa-7x"></i>
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
      <div className="myplaylist">
        <div className="myplaylist-title">My Playlist</div>
        {playlist.length > 0 && (
          <div>
            <button
              onClick={
                showCheckbox
                  ? () => setShowCheckbox(false)
                  : () => setShowCheckbox(true)
              }
            >
              {showCheckbox ? "cancel" : "edit"}
            </button>
            {showCheckbox && <button onClick={deletePlaylist}>delete</button>}
          </div>
        )}
      </div>
      <hr />
      {playlist.length === 0 && <div>Make your playlist!</div>}
      {playlist.length > 0 && (
        <div className="playlist-wrapper">
          <div className="myplaylist-section">
            {playlist.map((each) => (
              <EachPlaylist
                eachPlaylist={each}
                key={each.id}
                accessToken={accessToken}
                setCurrentVideo={setCurrentVideo}
                setMode={setMode}
                setComments={setComments}
                setPlaylistPlayer={setPlaylistPlayer}
                setCheckedPlaylist={setCheckedPlaylist}
                handleCheckedPlaylist={handleCheckedPlaylist}
                showCheckbox={showCheckbox}
                getPlaylist={getPlaylist}
                setPlaylist={setPlaylist}
                userInfo={userInfo}
                setCurrentPlaylist={setCurrentPlaylist}
                setCurrentPlaylistInfo={setCurrentPlaylistInfo}
              />
            ))}
          </div>
          <div className="myvideos-section">
            <div className="myvideos-playlist-name">
              {currentPlaylistInfo.playlist_name}
            </div>
            <div className="eachvideo-wrapper">
              {currentPlaylist.length > 0 &&
                currentPlaylist.map((video) => (
                  <EachMyVideo
                    key={video.id}
                    video={video}
                    setCurrentVideo={setCurrentVideo}
                    setMode={setMode}
                    setComments={setComments}
                    setPlaylistPlayer={setPlaylistPlayer}
                    currentPlaylist={currentPlaylist}
                    setCurrentPlaylist={setCurrentPlaylist}
                    getPlaylist={getPlaylist}
                    accessToken={accessToken}
                    setPlaylist={setPlaylist}
                    userInfo={userInfo}
                    currentPlaylistInfo={currentPlaylistInfo}
                  />
                ))}
              {currentPlaylist.length === 0 && <div>Click playlist!</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mypage;
