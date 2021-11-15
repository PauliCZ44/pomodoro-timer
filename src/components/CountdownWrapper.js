import React from "react";
import Countdown from "./Countdown";

function CountdownWrapper({ minutes, seconds, counterStatus }) {
  let classes = "bg-white bg-opacity-5";
  if (counterStatus === "RESTING") {
    classes = "bg-primary bg-opacity-40";
  } else if (counterStatus === "WORKING") {
    classes = "bg-accent bg-opacity-40";
  }
  return (
    <div className={classes + " pt-12 pb-6 my-12 rounded-lg  shadow-custom transition duration-1000 "}>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center ">
        <Countdown type="minutes" value={minutes}></Countdown>
        <Countdown type="seconds" value={seconds}></Countdown>
      </div>
      <h3 className="text-center h3 pt-6">{counterStatus}</h3>
    </div>
  );
}

export default CountdownWrapper;
