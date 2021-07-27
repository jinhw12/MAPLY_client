import axios from "axios";
import React, { useState } from "react";
import EachPlaylist from "./EachPlaylist";

function MyPlaylist({
  playlist,
  accessToken,
  setCurrentVideo,
  setMode,
  setComments,
  setPlaylistPlayer,
  getPlaylist,
  setPlaylist,
  userInfo,
}) {
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
        });
    });
  };

  return (
    <div className="playlist-section">
      <div className="myplaylist">
        My Playlist
        {playlist.length > 0 && (
          <>
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
          </>
        )}
      </div>
      <hr />
      {playlist.length === 0 ? (
        <div>Make your playlist!</div>
      ) : (
        playlist.map((each) => (
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
          />
        ))
      )}
    </div>
  );
}

export default MyPlaylist;
