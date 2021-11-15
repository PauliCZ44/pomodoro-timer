import React from "react";

function Navbar(props) {
  return (
    <div className="navbar mb-3 bg-neutral text-neutral-content shadow-custom">
      <div className="flex-none px-2 mx-2">
        <span className="text-lg font-bold">Pomodoro timer</span>
      </div>
      <div className="flex-1 px-2 mx-2">
        <div className="items-stretch hidden lg:flex">
          <span className="btn btn-ghost btn-sm rounded-btn">About</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
