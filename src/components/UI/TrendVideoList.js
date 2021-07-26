import React, { useEffect, useState } from "react";
import TrendVideo from './TrendVideo';
import axios from "axios";

function TrendVideoList({ setCurrentVideo, setMode, setComments }) {
  useEffect(() => {
    if (trendVideos.length === 0) {
      getTrendVideos();
    }
  }, [])

  const [trendVideos, setTrendVideos] = useState([]);

  const youtube = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3/",
    params: {
      part: "id,snippet",
      chart: "mostPopular",
      maxResults: 10,
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
      <div>
        {
          trendVideos.map((video, rank) => <TrendVideo
            video={video}
            rank={rank}
            setCurrentVideo={setCurrentVideo}
            setMode={setMode}
            setComments={setComments} />)
        }
      </div>
    </>
  );
}

export default TrendVideoList;