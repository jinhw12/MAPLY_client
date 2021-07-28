import axios from "axios";
import React, { useEffect, useState } from "react";
import EachMyVideo from "./EachMyVideo";

function EachPlaylist({
  eachPlaylist,
  accessToken,
  setCurrentVideo,
  setMode,
  setComments,
  setPlaylistPlayer,
  handleCheckedPlaylist,
  showCheckbox,
  getPlaylist,
  setPlaylist,
  userInfo,
  setCurrentPlaylist,
  setCurrentPlaylistInfo,
}) {
  const { playlist_name, count, playlist_thumbnail, id } = eachPlaylist;

  const [isShow, setIsShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const getVideo = () => {
    const playlistInfo = {
      playlist_name,
      id,
    };
    setCurrentPlaylistInfo(playlistInfo);
    setIsShow(true);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/video/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("get video : ", res.data);
        setCurrentPlaylist(res.data);
      });
  };

  const hideVideo = () => {
    setIsShow(false);
    setCurrentPlaylist([]);
  };

  const handleChecked = (e) => {
    setIsChecked(!isChecked);
    handleCheckedPlaylist(e.target.checked, id);
  };

  useEffect(() => {
    if (showCheckbox) {
      setIsChecked(false);
    }
  }, [showCheckbox]);

  return (
    <>
      <div className="each-playlist" onClick={getVideo}>
        {showCheckbox && (
          <div className="checkbox">
            <input
              type="checkbox"
              onChange={handleChecked}
              checked={isChecked}
            />
          </div>
        )}
        <div>
          <div className="playlist-title">
            <div className="playlist-name">{playlist_name}</div>
            <div className="count">{`${count}개의 비디오`}</div>
          </div>
          <div>
            <img className="playlist-thumbnail" src={playlist_thumbnail}></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default EachPlaylist;
