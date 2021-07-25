import axios from "axios";
import React, { useState } from "react";

function AddPlaylist({
  openAddPlaylist,
  setOpenAddPlaylist,
  currentVideo,
  userInfo,
  getPlaylist,
  setOpenPlaylistModal,
}) {
  const [playlistNameInput, setPlaylistNameInput] = useState("");

  const handlePlaylistNameInput = (e) => {
    setPlaylistNameInput(e.target.value);
  };

  const addNewPlaylist = () => {
    const { id, email } = userInfo;
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/playlist`, {
        email,
        playlist_name: playlistNameInput,
        title: currentVideo.snippet.title,
        thumbnail: currentVideo.snippet.thumbnails.medium.url,
        video_id: currentVideo.id.videoId,
      })
      .then(() => {
        getPlaylist();
        setOpenAddPlaylist(false);
        setOpenPlaylistModal(false);
      });
  };

  return (
    <div className={`add-playlist background ${openAddPlaylist ? "show" : ""}`}>
      <div>이름</div>
      <input
        type="text"
        placeholder="재생목록 이름을 입력하세요."
        onChange={handlePlaylistNameInput}
      ></input>
      <div>
        <button onClick={addNewPlaylist}>만들기</button>
      </div>
    </div>
  );
}

export default AddPlaylist;
