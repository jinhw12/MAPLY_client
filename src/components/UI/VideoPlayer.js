import React, { useState } from "react";
import EachVideo2 from "./EachVideo2";
import EachVideo3 from "./EachVideo3";
import EachVideo4 from "./EachVideo4";
import PlaylistModal from "../Playlist/PlaylistModal";
import "./UI.css";

function VideoPlayer({
  currentVideo,
  comments,
  searchedVideo,
  setCurrentVideo,
  setComments,
  playlist,
  setPlaylist,
  userInfo,
  getPlaylist,
  accessToken,
  playlistPlayer,
  trendVideoPlayer,
  loginHandler,
}) {
  const [openPlaylistModal, setOpenPlaylistModal] = useState(false);

  return (
    <>
      <div className="video-player-wrapper">
        <div className="play-section">
          <div className="video-player-container">
            <iframe
              className="iframe"
              src={`https://www.youtube.com/embed/${currentVideo.id.videoId}`}
              allowFullScreen
            ></iframe>
            <div className="current-video-info-box">
              <div>{currentVideo.snippet.title}</div>
              <i
                title="플레이리스트 추가"
                className="fas fa-plus open-playlist-btn"
                onClick={() => {
                  if (accessToken.length > 0) {
                    setOpenPlaylistModal(true);
                  } else {
                    loginHandler();
                  }
                }}
              />
            </div>
          </div>
          <div className="comments-container">
            <div className="comment-banner">Recent Comments</div>
            <ul>
              {comments.map((comment) => (
                <li className="each-comment-wrapper">
                  <div className="each-comment-box">{comment}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="list-section">
          <div className="side-bar-banner">
            {trendVideoPlayer.length > 0 ? "Trending Videos" : "Other Videos"}
          </div>
          {searchedVideo.length > 0 &&
            searchedVideo
              .filter((video) => video.id.videoId !== currentVideo.id.videoId)
              .map((video) => (
                <EachVideo2
                  video={video}
                  key={video.id.videoId}
                  setCurrentVideo={setCurrentVideo}
                  setComments={setComments}
                />
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
