import React, { useState } from "react";

function Countdown(props) {
  let [value, setValue] = useState("22");

  const style = {
    "--value": value,
  };
  return (
    <div className="flex flex-col p-2  justify-center bg-neutral rounded-box text-neutral-content">
      <span className="font-mono text-5xl countdown">
        <span style={style}></span>
      </span>
      {props.type}
    </div>
  );
}

export default Countdown;
