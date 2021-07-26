import axios from "axios";
import React from "react";
import EachPlaylist from "./EachPlaylist";

function MyPlaylist({ playlist, accessToken }) {
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
        playlist.map((each) => (
          <EachPlaylist
            eachPlaylist={each}
            key={each.id}
            accessToken={accessToken}
          />
        ))
      )}
    </div>
  );
}

export default MyPlaylist;
