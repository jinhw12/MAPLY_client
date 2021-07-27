import React, { useState } from "react";
import axios from "axios";
import EachVideo2 from "./EachVideo2";
import EachVideo3 from "./EachVideo3";
import EachVideo4 from "./EachVideo4";
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
  accessToken,
  playlistPlayer,
  trendVideoPlayer,
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
          {searchedVideo.length > 0 &&
            searchedVideo
              .filter((video) => video.id.videoId !== currentVideo.id.videoId)
              .map((video) => (
                <EachVideo2
                  video={video}
                  key={video.id.videoId}
                  setCurrentVideo={setCurrentVideo}
                  setComments={setComments}
                ></EachVideo2>
              ))}
          {playlistPlayer.length > 0 &&
            playlistPlayer
              .filter((video) => video.video_id !== currentVideo.id.videoId)
              .map((video) => (
                <EachVideo3
                  video={video}
                  key={video.id}
                  setCurrentVideo={setCurrentVideo}
                  setComments={setComments}
                />
              ))}
          {trendVideoPlayer.length > 0 &&
            trendVideoPlayer
              .filter((video) => video.id !== currentVideo.id.videoId)
              .map((video) => (
                <EachVideo4
                  video={video}
                  key={video.id.videoId}
                  setCurrentVideo={setCurrentVideo}
                  setComments={setComments}
                />
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
        accessToken={accessToken}
      ></PlaylistModal>
    </>
  );
}

export default VideoPlayer;
