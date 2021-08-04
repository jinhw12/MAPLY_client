import React, { useState } from "react";
import axios from "axios";
import "./UI.css";

function SearchVideo({ setSearchedVideo, setMode }) {
  const [searchVideoInput, setSearchVideoInput] = useState("");

  const handleSearchVideoInput = (e) => {
    setSearchVideoInput(e.target.value);
  };

  const youtube = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3/",
    params: {
      part: "snippet",
      maxResults: 15,
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    },
  });

  const handleSearchVideo = (e) => {
    if (searchVideoInput.length === 0) {
      return;
    } else if (e.keyCode === 13 || e.type === "click") {
      youtube
        .get("/search", {
          params: {
            q: searchVideoInput,
          },
        })
        .then((res) => {
          setSearchedVideo(
            res.data.items.filter((video) =>
              Object.keys(video.id).includes("videoId")
            )
          );
          setMode("search");
        });
    }
  }

  return (
    <div class="search">
      <div class="search_inner">
        <i
          class="fa fa-search"
          aria-hidden="true"
          onClick={handleSearchVideo}
        />
        <input
          className="search-video-input search-field"
          type="search"
          placeholder="search video"
          onChange={handleSearchVideoInput}
          onKeyUp={handleSearchVideo}
        />
      </div>
    </div>
  );
}

export default SearchVideo;
