import axios from "axios";
import React, { useState } from "react";

function AddPlaylist({ openAddPli, currentVideo }) {
  const [pliNameInput, setPliNameInput] = useState("");

  const handlePliNameInput = (e) => {
    setPliNameInput(e.target.value);
  };

  const addNewPlaylist = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/playlist`, {
        user_id: 1,
        name: pliNameInput,
      })
      .then((res) => {
        console.log("addplaylist : ", res.data);
        axios.post(`${process.env.REACT_APP_SERVER_URL}/content`, {
          //Todo: palylist_id
          playlist_id: res.data,
          video_id: currentVideo.id.videoId,
          title: currentVideo.snippet.title,
          thumbnail: currentVideo.snippet.thumbnails.medium.url,
        });
      });
  };

  return (
    <div className={`add-playlist background ${openAddPli ? "show" : ""}`}>
      <div>이름</div>
      <input
        type="text"
        placeholder="재생목록 이름을 입력하세요."
        onChange={handlePliNameInput}
      ></input>
      <div>
        <button onClick={addNewPlaylist}>만들기</button>
      </div>
    </div>
  );
}

export default AddPlaylist;
