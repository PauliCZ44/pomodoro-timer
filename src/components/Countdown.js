import React from "react";

function Countdown(props) {
  const style = {
    "--value": props.value,
  };

  return (
    <div className="flex flex-col p-2 shadow-lg justify-center bg-neutral rounded-box text-neutral-content bg-opacity-90">
      <span className="font-mono text-7xl countdown fs-80">
        <span style={style} className=""></span>
      </span>
      {props.type}
    </div>
  );
}

export default Countdown;
