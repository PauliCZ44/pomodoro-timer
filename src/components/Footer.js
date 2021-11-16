import React from "react";

function Footer(props) {
  return (
    <footer className="p-2 footer bg-base-300 text-base-content footer-center text-xs">
      <div>
        <p className="text-base-content text-opacity-70">
          <span className="mr-10"> Made by Pavel Stastny.</span>
          <span className="mr-10">Copyright © 2021 - All right reserved</span>
          <span className="inline-block">
            <a href="https://github.com/PauliCZ44/">My github.</a>
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
