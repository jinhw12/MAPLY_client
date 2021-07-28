import React, { useState } from "react";
import EachVideo from "./EachVideo";

function VideoList({
  searchedVideo,
  setCurrentVideo,
  setMode,
  mode,
  setComments,
  setPlaylistPlayer,
  setTrendVideoPlayer,
}) {
  return (
    <>
      <div className="video-list-flex">
        <div>
          {searchedVideo.map((video) => (
            <EachVideo
              video={video}
              key={video.etag}
              setCurrentVideo={setCurrentVideo}
              setMode={setMode}
              setComments={setComments}
              setPlaylistPlayer={setPlaylistPlayer}
              setTrendVideoPlayer={setTrendVideoPlayer}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default VideoList;
