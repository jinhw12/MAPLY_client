import axios from "axios";
import React from "react";
import EachPlaylist from "./EachPlaylist";

function MyPlaylist({ playlist }) {
  playlist = [
    { id: 1, playlist_name: "test", count: 3, playlist_thumbnail: "url" },
  ];
  return (
    <div className="mypage-playlist">
      <div>
        My Playlist
        <button>edit</button>
      </div>
      <hr />
      {playlist.length === 0 ? (
        <div>Make your playlsit!</div>
      ) : (
        <ul>
          {playlist.map((each) => (
            <li style={{ listStyleType: "none" }}>
              <div>
                <EachPlaylist eachPlaylist={each} />
              </div>
              <hr></hr>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyPlaylist;
