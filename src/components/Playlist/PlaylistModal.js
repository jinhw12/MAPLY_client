import axios from "axios";
import React, { useState } from "react";
import AddPlaylist from "./AddPlaylist";
import "./Playlist.css";

function PlaylistModal({
  openPlaylistModal,
  setOpenPlaylistModal,
  playlist,
  currentVideo,
  userInfo,
  getPlaylist,
  accessToken,
}) {
  const [openAddPlaylist, setOpenAddPlaylist] = useState(false);

  const handleCloseModal = () => {
    setOpenPlaylistModal(false);
    setOpenAddPlaylist(false);
  };

  const addVideo = (playlist_id) => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/video`,
        {
          playlist_id,
          title: currentVideo.snippet.title,
          thumbnail: currentVideo.snippet.thumbnails.medium.url,
          video_id: currentVideo.id.videoId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("add video : ", res);
        getPlaylist(userInfo.id, accessToken);
      })
      .then(() => {
        setOpenPlaylistModal(false);
      })
      .catch((err) => {
        console.log(err);
        alert("already exist");
      });
  };

  return (
    <>
      <div
        className={`playlist-modal background ${
          openPlaylistModal ? "show" : ""
        }`}
      >
        <div className="playlist-modal-outsider" onClick={handleCloseModal} />
        <div className="playlist-modal-content">
          <div className="save-playlist-modal-title">
            Save
            <i
              class="fas fa-times playlist-modal-close"
              onClick={handleCloseModal}
            />
          </div>
          <div>
            {playlist.length === 0 && !openAddPlaylist && (
              <>
                <div className="playlist-title-container">
                  <i
                    class="fas fa-plus add-playlist-btn"
                    onClick={() => setOpenAddPlaylist(true)}
                  />
                </div>
              </>
            )}
            {playlist.length > 0 && !openAddPlaylist && (
              <div>
                <ul>
                  {playlist.map((each) => (
                    <li
                      className="playlist-title-container"
                      style={{ listStyleType: "none" }}
                      onClick={() => {
                        addVideo(each.id);
                      }}
                    >
                      <div>{each.playlist_name}</div>
                    </li>
                  ))}
                </ul>
                <div className="playlist-title-container">
                  <i
                    class="fas fa-plus add-playlist-btn"
                    onClick={() => setOpenAddPlaylist(true)}
                  />
                </div>
              </div>
            )}
          </div>
          <AddPlaylist
            openAddPlaylist={openAddPlaylist}
            setOpenAddPlaylist={setOpenAddPlaylist}
            currentVideo={currentVideo}
            userInfo={userInfo}
            getPlaylist={getPlaylist}
            setOpenPlaylistModal={setOpenPlaylistModal}
            accessToken={accessToken}
          />
        </div>
      </div>
    </>
  );
}

export default PlaylistModal;
