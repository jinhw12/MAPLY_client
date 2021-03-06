import axios from "axios";
import React from "react";
import "./UI.css";

function TrendVideo({
  video,
  rank,
  setCurrentVideo,
  setMode,
  setComments,
  setTrendVideoPlayer,
  trendVideos,
  setSearchedVideo,
  setPlaylistPlayer,
}) {
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
        `https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&textFormat=plainText&part=snippet&videoId=${video.id}&maxResults=15`
      )
      .then((res) => {
        console.log("trendvideo comments : ", res.data);
        const comments = res.data.items.map(
          (comment) => comment.snippet.topLevelComment.snippet.textDisplay
        );
        setComments(comments);
        setCurrentVideo(trendVideo);
        setTrendVideoPlayer(trendVideos);
        setSearchedVideo([]);
        setPlaylistPlayer([]);
        setMode("play");
      });
  };
  // video.snippet.title
  return (
    <>
      <div onClick={handleClickVideo} className="trend-video-wrapper">
        <div className="trend-video-container">
          <img
            className="trend-video-img"
            src={video.snippet.thumbnails.medium.url}
          />
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
