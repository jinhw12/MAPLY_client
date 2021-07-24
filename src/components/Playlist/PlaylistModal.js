import axios from "axios";
import React, { useState } from "react";
import AddPlaylist from "./AddPlaylist";

function PlaylistModal({
  openPliModal,
  setOpenPliModal,
  playlist,
  setPlaylist,
  currentVideo,
}) {
  const [openAddPli, setOpenAddPli] = useState(false);

  return (
    <>
      <div className={`pli-modal background ${openPliModal ? "show" : ""}`}>
        <div
          className="pli-modal-outsider"
          onClick={() => setOpenPliModal(false)}
        />
        <div className="pli-modal-content">
          <div>
            저장하기
            <span
              className="pli-modal-close"
              onClick={() => setOpenPliModal(false)}
            >
              X
            </span>
            <hr></hr>
          </div>
          <div>
            {playlist.length === 0 ? (
              <>
                <button onClick={() => setOpenAddPli(true)}>+</button>
                <div>새 플레이리스트 만들기</div>
              </>
            ) : (
              playlist.map((each) => {
                <div></div>;
              })
            )}
          </div>
          <AddPlaylist openAddPli={openAddPli} currentVideo={currentVideo} />
        </div>
      </div>
    </>
  );
}

export default PlaylistModal;
