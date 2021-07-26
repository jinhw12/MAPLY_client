import axios from "axios";
import React, { useState, useRef } from "react";

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
        getPlaylist(id, accessToken);
        setPlaylistName("");
        setOpenAddPlaylist(false);
        setOpenPlaylistModal(false);
        playlistNameInput.current.value = "";
      });
  };

  return (
    <div className={`add-playlist background ${openAddPlaylist ? "show" : ""}`}>
      <div>이름</div>
      <input
        type="text"
        placeholder="재생목록 이름을 입력하세요."
        onChange={handlePlaylistName}
        ref={playlistNameInput}
      ></input>
      <div>
        <button onClick={addNewPlaylist}>만들기</button>
      </div>
    </div>
  );
}

export default AddPlaylist;
