import axios from "axios";
import React from "react";

function TrendVideo({ video, rank, setCurrentVideo, setMode, setComments }) {
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
        setMode("play");
      });
  };
  // video.snippet.title
  return (
    <>
      <div onClick={handleClickVideo} className="trend-video-wrapper">
        <div className="trend-video-container">
          <img className="trend-video-img" src={video.snippet.thumbnails.medium.url} />
          <div className="trend-video-title">
            <div>Trending #{rank + 1}</div>
            <div>{video.snippet.title}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrendVideo;
