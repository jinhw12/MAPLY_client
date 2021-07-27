import axios from "axios";
import React, { useState } from "react";
import AddPlaylist from "./AddPlaylist";

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
          <div>
            저장하기
            <span className="playlist-modal-close" onClick={handleCloseModal}>
              X
            </span>
            <hr></hr>
          </div>
          <div>
            {playlist.length === 0 && !openAddPlaylist && (
              <>
                <button onClick={() => setOpenAddPlaylist(true)}>+</button>
                <div>새 플레이리스트 만들기</div>
              </>
            )}
            {playlist.length > 0 && !openAddPlaylist && (
              <div>
                <ul>
                  {playlist.map((each) => (
                    <li
                      style={{ listStyleType: "none" }}
                      onClick={() => {
                        addVideo(each.id);
                      }}
                    >
                      <div>{each.playlist_name}</div>
                      <hr></hr>
                    </li>
                  ))}
                </ul>
                <hr />
                <div>
                  <button onClick={() => setOpenAddPlaylist(true)}>+</button>
                  <div>새 플레이리스트 만들기</div>
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
