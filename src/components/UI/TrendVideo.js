import axios from "axios";
import React from "react";

function TrendVideo({ video, rank }) {
    return (
        <>
            <div>
                <div>
                    Trending #{rank + 1}
                </div>
                <img src={video.snippet.thumbnails.medium.url}></img>
                <div>{video.snippet.title}</div>
            </div>
        </>
    );
}

export default TrendVideo;
