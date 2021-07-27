import React, { useState } from "react";
import axios from "axios";

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

  const handleSearchVideo = () => {
    youtube
      .get("/search", {
        params: {
          q: searchVideoInput,
        },
      })
      .then((res) => {
        setSearchedVideo(res.data.items);
        setMode("search");
      });
  };

  return (
    <div className="search-video-container">
      <span>
        <input
          className="search-video-input"
          type="text"
          placeholder="search video"
          onChange={handleSearchVideoInput}
        ></input>
        <button className="search-video-btn" onClick={handleSearchVideo}>검색</button>
      </span>
    </div>
  );
}

export default SearchVideo;
