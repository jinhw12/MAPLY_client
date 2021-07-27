import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

function AddPlaylist({
  openAddPlaylist,
  setOpenAddPlaylist,
  currentVideo,
  userInfo,
  getPlaylist,
  setOpenPlaylistModal,
  accessToken,
}) {
  const [playlistName, setPlaylistName] = useState("");
  const playlistNameInput = useRef();

  const handlePlaylistName = (e) => {
    setPlaylistName(e.target.value);
  };

  const addNewPlaylist = () => {
    const { id, email } = userInfo;
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/playlist`,
        {
          email,
          playlist_name: playlistName,
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
      .then(() => {
        getPlaylist();
        setPlaylistName("");
        setOpenAddPlaylist(false);
        setOpenPlaylistModal(false);
        playlistNameInput.current.value = "";
      });
  };

  useEffect(() => {
    if (!openAddPlaylist) {
      playlistNameInput.current.value = "";
    }
  }, [openAddPlaylist]);

  return (
    <div className={`add-playlist background ${openAddPlaylist ? "show" : ""}`}>
      <div className="add-playlist-modal">
        <div>
          <input
            type="text"
            className="playlist-name-input"
            placeholder="재생목록 이름을 입력하세요."
            onChange={handlePlaylistName}
            ref={playlistNameInput}
          />
          <div className="playlist-name-btn-box">
            <button className="playlist-btn orange" onClick={addNewPlaylist}>Create</button>
            <button className="playlist-btn gray" onClick={() => { setOpenAddPlaylist(false) }}>Return</button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default AddPlaylist;
