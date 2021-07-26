import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";

function EachMyVideo({
  video,
  setCurrentVideo,
  setMode,
  setComments,
  eachPlaylist,
  setPlaylistPlayer,
  currentPlaylist,
}) {
  const history = useHistory();
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
  const handleClickVideo = async () => {
    const result = await axios.get(
      `https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&textFormat=plainText&part=snippet&videoId=${video_id}&maxResults=50`
    );
    setComments(result.data.items);
    setCurrentVideo(myVideo);
    setPlaylistPlayer(currentPlaylist);
    setMode("play");
    history.push("/");
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
