import React from "react";

function Navbar(props) {
  return (
    <div className="navbar mb-3 shadow-lg bg-neutral text-neutral-content ">
      <div className="flex-none px-2 mx-2">
        <span className="text-lg font-bold">App name</span>
      </div>
      <div className="flex-1 px-2 mx-2">
        <div className="items-stretch hidden lg:flex">
          <a className="btn btn-ghost btn-sm rounded-btn">About</a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;