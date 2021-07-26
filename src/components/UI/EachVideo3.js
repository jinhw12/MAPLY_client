import axios from "axios";
import React from "react";

function EachVideo3({ video, setCurrentVideo, setComments }) {
  const handleClickVideo = () => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&textFormat=plainText&part=snippet&videoId=${video.video_id}&maxResults=50`
      )
      .then((res) => {
        setCurrentVideo(video);
        setComments(res.data.items);
      });
  };

  return (
    <>
      <div onClick={handleClickVideo}>
        <img src={video.thumbnail}></img>
        <div>{video.title}</div>
      </div>
    </>
  );
}

export default EachVideo3;
