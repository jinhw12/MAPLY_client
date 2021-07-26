import axios from "axios";
import React from "react";
import EachPlaylist from "./EachPlaylist";

function MyPlaylist({ playlist }) {
  return (
    <div className="mypage-playlist">
      <div>
        My Playlist
        <button>edit</button>
      </div>
      <hr />
      {playlist.length === 0 ? (
        <div>Make your playlist!</div>
      ) : (
        playlist.map((each) => <EachPlaylist eachPlaylist={each} />)
      )}
    </div>
  );
}

export default MyPlaylist;
