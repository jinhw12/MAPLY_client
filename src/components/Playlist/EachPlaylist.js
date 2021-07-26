import axios from "axios";
import React, { useState } from "react";
import EachMyVideo from "./EachMyVideo";

function EachPlaylist({
  eachPlaylist,
  accessToken,
  setCurrentVideo,
  setMode,
  setComments,
  setPlaylistPlayer,
}) {
  const { playlist_name, count, playlist_thumbnail, id } = eachPlaylist;
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const getVideo = () => {
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

  return (
    <>
      <div>
        <div className="playlist-thumbnail">
          <img src={playlist_thumbnail}></img>
        </div>
        <div className="playlist-title">
          <div>{playlist_name}</div>
          <div>{`${count}개의 비디오`}</div>
          <button onClick={isShow ? hideVideo : getVideo}>
            {isShow ? "hide" : "show"}
          </button>
        </div>
        {currentPlaylist.length > 0 &&
          currentPlaylist.map((video) => (
            <EachMyVideo
              key={video.id}
              video={video}
              setCurrentVideo={setCurrentVideo}
              setMode={setMode}
              setComments={setComments}
              eachPlaylist={eachPlaylist}
              setPlaylistPlayer={setPlaylistPlayer}
              currentPlaylist={currentPlaylist}
            />
          ))}
      </div>
    </>
  );
}

export default EachPlaylist;
