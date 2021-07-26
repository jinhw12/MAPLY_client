import axios from "axios";
import React from "react";

function EachMyVideo({ video }) {
  const { title, thumbnail, video_id } = video;
  const handleClickVideo = () => {
    //setCurrentVideo(video)//video 객체 형태 바꾸기
  };
  return (
    <>
      <div onClick={handleClickVideo}>
        <img src={thumbnail}></img>
        <div>{title}</div>
      </div>
    </>
  );
}

export default EachMyVideo;
