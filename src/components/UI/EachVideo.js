import axios from "axios";
import React from "react";

function EachVideo({ video, setCurrentVideo, setMode, setComments }) {
  const handleClickVideo = () => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&textFormat=plainText&part=snippet&videoId=${video.id.videoId}&maxResults=50`
      )
      .then((res) => {
        setCurrentVideo(video);
        setComments(res.data.items);
        setMode("play");
      });
  };

  return (
    <>
      <div onClick={handleClickVideo}>
        <img src={video.snippet.thumbnails.medium.url}></img>
        <div>{video.snippet.title}</div>
      </div>
    </>
  );
}

export default EachVideo;
