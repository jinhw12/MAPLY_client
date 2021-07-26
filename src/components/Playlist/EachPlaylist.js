import axios from "axios";
import React, { useState } from "react";
import EachMyVideo from "./EachMyVideo";

function EachPlaylist({ eachPlaylist, accessToken }) {
  const { playlist_name, count, playlist_thumbnail, id } = eachPlaylist;
  const [currentPlaylist, setCurrentPlaylist] = useState([]);

  const getVideo = () => {
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

  return (
    <>
      <div onClick={getVideo}>
        <div className="playlist-thumbnail">
          <img src={playlist_thumbnail}></img>
        </div>
        <div className="playlist-title">
          <div>{playlist_name}</div>
          <div>{`${count}개의 비디오`}</div>
        </div>
        {currentPlaylist.length > 0 ? (
          currentPlaylist.map((video) => (
            <EachMyVideo key={video.id} video={video} />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default EachPlaylist;
