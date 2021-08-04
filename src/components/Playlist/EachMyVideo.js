import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Playlist.css"

function EachMyVideo({
  video,
  setCurrentVideo,
  setMode,
  setComments,
  setPlaylistPlayer,
  currentPlaylist,
  setCurrentPlaylist,
  accessToken,
  getPlaylist,
  currentPlaylistInfo,
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
      `https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&textFormat=plainText&part=snippet&videoId=${video_id}&maxResults=15`
    );
    const comments = result.data.items.map(
      (comment) => comment.snippet.topLevelComment.snippet.textDisplay
    );
    setComments(comments);
    setCurrentVideo(myVideo);
    setPlaylistPlayer(currentPlaylist);
    setMode("play");
    history.push("/");
  };

  const deleteVideo = (e) => {
    e.stopPropagation();
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/video/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      .then(async (res) => {
        console.log("delete video : ", res);
        await getPlaylist();
        getVideo();
      });
  };
  const getVideo = () => {
    console.log(accessToken);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/video/${currentPlaylistInfo.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("get video after delete: ", res.data);
        setCurrentPlaylist(res.data);
      });
  };

  return (
    <div>
      <div className="each-myvideo" onClick={handleClickVideo}>
        <img className="myvideo-thumbnail" src={thumbnail}></img>
        <div className="myvideo-title">{title}</div>
        <div>
          <div onClick={(e) => { deleteVideo(e) }}>
            <i class="far fa-trash-alt del-myvideo"></i>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}

export default EachMyVideo;
