import axios from "axios";
import React, { useState } from "react";
import EachMyVideo from "./EachMyVideo";

function EachPlaylist({ eachPlaylist }) {
  //const {playlist_name, count, playlist_thumbnail} = eachPlaylist
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const getVideo = () => {
    //getVideo(playlist_id)
    // axios.get(`${process.env.REACT_APP_SERVER_URL}/video/${playlist_id}`)
    // .then((res) => {
    //   console.log(res)
    setCurrentPlaylist([
      { title: "video1", thumbnail: "url1", video_id: "id1" },
      { title: "video2", thumbnail: "url2", video_id: "id2" },
      { title: "video3", thumbnail: "url3", video_id: "id3" },
    ]);
    // })
  };
  return (
    <>
      <div onClick={getVideo}>
        <div className="playlist-thumbnail">썸네일</div>
        <div className="playlist-title">
          <div>플레이리스트 제목</div>
          <div>__개의 비디오</div>
        </div>
        {currentPlaylist.length > 0 ? (
          currentPlaylist.map((video) => <EachMyVideo video={video} />)
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default EachPlaylist;
