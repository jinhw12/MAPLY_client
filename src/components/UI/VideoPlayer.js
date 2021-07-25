import React, { useState } from "react";
import axios from "axios";
import EachVideo2 from "./EachVideo2";
import PlaylistModal from "../Playlist/PlaylistModal";

function VideoPlayer({
  currentVideo,
  comments,
  searchedVideo,
  setCurrentVideo,
  setComments,
  mode,
  playlist,
  setPlaylist,
  userInfo,
  getPlaylist,
}) {
  const [openPlaylistModal, setOpenPlaylistModal] = useState(false);

  return (
    <>
      <div className="video-player">
        <div className="play-section">
          <div>
            <iframe
              className="iframe"
              src={`https://www.youtube.com/embed/${currentVideo.id.videoId}`}
              allowFullScreen
            ></iframe>
          </div>
          <div>{currentVideo.snippet.title}</div>
          <button onClick={() => setOpenPlaylistModal(true)}>저장</button>
          <div>
            <ul>
              {comments.map((comment) => (
                <li style={{ listStyleType: "none" }}>
                  <div>
                    {comment.snippet.topLevelComment.snippet.textDisplay}
                  </div>
                  <hr></hr>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="list-section">
          {searchedVideo.map((video) => (
            <EachVideo2
              video={video}
              key={video.etag}
              setCurrentVideo={setCurrentVideo}
              setComments={setComments}
            ></EachVideo2>
          ))}
        </div>
      </div>
      <PlaylistModal
        openPlaylistModal={openPlaylistModal}
        setOpenPlaylistModal={setOpenPlaylistModal}
        playlist={playlist}
        setPlaylist={setPlaylist}
        currentVideo={currentVideo}
        userInfo={userInfo}
        getPlaylist={getPlaylist}
      ></PlaylistModal>
    </>
  );
}

export default VideoPlayer;
