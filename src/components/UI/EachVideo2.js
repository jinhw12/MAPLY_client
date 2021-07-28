import axios from "axios";
import React from "react";

function EachVideo2({ video, setCurrentVideo, setComments }) {
  const handleClickVideo = () => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&textFormat=plainText&part=snippet&videoId=${video.id.videoId}&maxResults=15`
      )
      .then((res) => {
        const comments = res.data.items.map(comment => comment.snippet.topLevelComment.snippet.textDisplay);
        setCurrentVideo(video);
        setComments(comments);
      });
  };

  return (
    <>
      <div className="sidebar-playlist" onClick={handleClickVideo}>
        <img className="sidebar-video-img" src={video.snippet.thumbnails.medium.url}></img>
        <div className="sidebar-video-title">{video.snippet.title}</div>
      </div>
    </>
  );
}

export default EachVideo2;
