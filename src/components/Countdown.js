import React from "react";

function Countdown(props) {
  const style = {
    "--value": props.value,
  };

  return (
    <div className="flex flex-col p-2  justify-center bg-neutral rounded-box text-neutral-content">
      <span className="font-mono text-7xl countdown">
        <span style={style}></span>
      </span>
      {props.type}
    </div>
  );
}

export default Countdown;
