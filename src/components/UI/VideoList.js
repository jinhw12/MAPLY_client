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
      <div className="video-list-flex">
        <div>
          {searchedVideo.map((video) => (
            <EachVideo
              video={video}
              key={video.etag}
              setCurrentVideo={setCurrentVideo}
              setMode={setMode}
              setComments={setComments}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default VideoList;
