import React, { useEffect, useState } from "react";
import TrendVideo from "./TrendVideo";
import axios from "axios";
import "./UI.css"

function TrendVideoList({
  setCurrentVideo,
  setMode,
  setComments,
  setTrendVideoPlayer,
  setSearchedVideo,
  setPlaylistPlayer,
}) {
  useEffect(() => {
    if (trendVideos.length === 0) {
      getTrendVideos();
    }
  }, []);

  const [trendVideos, setTrendVideos] = useState([]);

  const youtube = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3/",
    params: {
      part: "id,snippet",
      chart: "mostPopular",
      maxResults: 9,
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    },
  });

  const getTrendVideos = () => {
    youtube
      .get("/videos", {
        params: {
          regionCode: "KR",
          videoCategoryId: "10",
        },
      })
      .then((res) => {
        console.log("get trending videos : ", res.data.items);
        setTrendVideos(res.data.items);
      });
  };

  return (
    <>
      <div className="trend-video-banner">Trending Videos</div>
      <div className="trend-video-list">
        {trendVideos.map((video, rank) => (
          <TrendVideo
            video={video}
            rank={rank}
            setCurrentVideo={setCurrentVideo}
            setMode={setMode}
            setComments={setComments}
            setTrendVideoPlayer={setTrendVideoPlayer}
            trendVideos={trendVideos}
            setSearchedVideo={setSearchedVideo}
            setPlaylistPlayer={setPlaylistPlayer}
          />
        ))}
      </div>
    </>
  );
}

export default TrendVideoList;
