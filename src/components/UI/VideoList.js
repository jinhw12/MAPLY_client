import React, { useState } from "react";
import EachVideo from "./EachVideo";

function VideoList({
  searchedVideo,
  setCurrentVideo,
  setMode,
  mode,
  setComments,
}) {
  return (
    <>
      <div className="video-list">
        {searchedVideo.map((video) => (
          <EachVideo
            video={video}
            key={video.etag}
            setCurrentVideo={setCurrentVideo}z2
            setMode={setMode}
            setComments={setComments}
          />
        ))}
      </div>
    </>
  );
}

export default VideoList;
