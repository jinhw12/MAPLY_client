import axios from "axios";
import React from "react";

function EachVideo2({ video, setCurrentVideo, setComments }) {
  const trendVideo = {
    snippet: {
      title: video.snippet.title,
      thumbnails: {
        medium: {
          url: video.snippet.thumbnails.medium.url,
        },
      },
    },
    id: { videoId: video.id },
  };
  const handleClickVideo = () => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&textFormat=plainText&part=snippet&videoId=${video.id}&maxResults=50`
      )
      .then((res) => {
        setCurrentVideo(trendVideo);
        setComments(res.data.items);
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

export default EachVideo2;
