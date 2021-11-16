import React from "react";

function Footer(props) {
  return (
    <footer className="p-2 footer bg-base-300 text-base-content footer-center text-xs">
      <div>
        <p className="text-base-content text-opacity-70 flex gap-x-5 gap-y-3 flex-wrap justify-center">
          <span className="">Made by Pavel Stastny</span>
          <span className="">Copyright © 2021</span>
          <span className="inline-block">
            <a href="https://github.com/PauliCZ44/">My github</a>
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
