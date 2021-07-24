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
  setMode,
  playlist,
  setPlaylist,
}) {
  const [openPliModal, setOpenPliModal] = useState(false);

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
          <button onClick={() => setOpenPliModal(true)}>저장</button>
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
        openPliModal={openPliModal}
        setOpenPliModal={setOpenPliModal}
        playlist={playlist}
        setPlaylist={setPlaylist}
        currentVideo={currentVideo}
      ></PlaylistModal>
    </>
  );
}

export default VideoPlayer;
