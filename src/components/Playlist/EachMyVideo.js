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
  setCurrentPlaylist,
  accessToken,
  getPlaylist,
  setPlaylist,
  userInfo,
  getVideo,
}) {
  const history = useHistory();
  const { title, thumbnail, video_id, id } = video;
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

  const deleteVideo = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/video/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("delete video : ", res);
        getPlaylist();
      })
      .then((res) => {
        getVideo();
      });
  };

  return (
    <>
      <div onClick={handleClickVideo}>
        <img src={thumbnail}></img>
        <div>{title}</div>
      </div>
      <button onClick={deleteVideo}>delete</button>
    </>
  );
}

export default EachMyVideo;
