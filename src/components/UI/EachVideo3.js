import axios from "axios";
import React from "react";

function EachVideo3({ video, setCurrentVideo, setComments }) {
  const { title, thumbnail, video_id } = video;
  const myVideo = {
    snippet: {
      title,
      thumbnails: {
        medium: {
          url: thumbnail,
        },
      },
    },
    id: {
      videoId: video_id,
    },
  };
  const handleClickVideo = () => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&textFormat=plainText&part=snippet&videoId=${video_id}&maxResults=30`
      )
      .then((res) => {
        setCurrentVideo(myVideo);
        setComments(res.data.items);
      });
  };

  return (
    <>
      <div className="sidebar-playlist" onClick={handleClickVideo}>
        <img className="sidebar-video-img" src={video.thumbnail}></img>
        <div className="sidebar-video-title">{video.title}</div>
      </div>
    </>
  );
}

export default EachVideo3;
