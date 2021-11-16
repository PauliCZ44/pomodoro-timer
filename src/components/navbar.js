import React from "react";
import ghlogo2 from "./../assets/ghlogo2.png";

function Navbar(props) {
  return (
    <div className="navbar mb-3 bg-neutral text-neutral-content shadow-custom">
      <div className="flex-none px-2 mx-2">
        <span className="text-lg font-bold">Pomodoro timer</span>
      </div>
      <div className="flex-1 px-2 mx-2">{/* Space for buttons in  the future */}</div>

      <div className="flex-none">
        <a href="https://github.com/PauliCZ44/pomodoro-timer/tree/main" target="_blank">
          <button className="btn btn-circle btn-sm btn-ghost" style={{ minHeight: "32px", width: "32px" }}>
            <img src={ghlogo2} alt="github logo" height="32px" width="32px" />
          </button>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
