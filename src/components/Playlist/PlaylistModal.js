import axios from "axios";
import React, { useState } from "react";
import AddPlaylist from "./AddPlaylist";

function PlaylistModal({
  openPlaylistModal,
  setOpenPlaylistModal,
  playlist,
  setPlaylist,
  currentVideo,
  userInfo,
  getPlaylist,
}) {
  const [openAddPlaylist, setOpenAddPlaylist] = useState(false);

  return (
    <>
      <div
        className={`playlist-modal background ${
          openPlaylistModal ? "show" : ""
        }`}
      >
        <div
          className="playlist-modal-outsider"
          onClick={() => setOpenPlaylistModal(false)}
        />
        <div className="playlist-modal-content">
          <div>
            저장하기
            <span
              className="playlist-modal-close"
              onClick={() => setOpenPlaylistModal(false)}
            >
              X
            </span>
            <hr></hr>
          </div>
          <div>
            {playlist.length === 0 && !openAddPlaylist ? (
              <>
                <button onClick={() => setOpenAddPlaylist(true)}>+</button>
                <div>새 플레이리스트 만들기</div>
              </>
            ) : playlist.length === 0 && openAddPlaylist ? (
              <></>
            ) : (
              <div>
                <ul>
                  {playlist.map((each) => (
                    <li style={{ listStyleType: "none" }}>
                      <div>{each.playlist_name}</div>
                      <hr></hr>
                    </li>
                  ))}
                </ul>
                <hr />
                <button onClick={() => setOpenAddPlaylist(true)}>+</button>
                <div>새 플레이리스트 만들기</div>
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
          />
        </div>
      </div>
    </>
  );
}

export default PlaylistModal;
