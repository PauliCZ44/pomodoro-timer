import React from "react";
import { useState } from "react";
import Countdown from "./Countdown";
import quotes from "../quotes";

function CountdownWrapper({ minutes, seconds, counterStatus, qIndex }) {
  let classes = "bg-white bg-opacity-5";
  let message = <h3 className="text-center h4 pt-14 pb-10">"Press 'START' to start your session"</h3>;
  let quote = null;
  if (counterStatus === "RESTING") {
    message = <h3 className="text-center h4 pt-14 pb-10">"It's time to get some rest"</h3>;
    classes = "bg-blue-400 bg-opacity-40";
    quote = null;
  } else if (counterStatus === "WORKING") {
    classes = "bg-primary bg-opacity-40";
    message = <h4 className="text-center h5 pt-6">Time to do some work!</h4>;
    quote = (
      <div className="py-4 px-6 text-center">
        <h5 className="text-gray-300 mb-3 text-base italic">{quotes[qIndex].message}</h5>
        <small className="text-opacity-80 text-gray-300  text-xs">- {quotes[qIndex].author}</small>
      </div>
    );
  }

  return (
    <div className={classes + "  pt-8 md:pt-12 pb-4 md:pb-6 my-6 md:my-12 rounded-lg  shadow-custom transition duration-1000 "} id="timer-label">
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center ">
        <Countdown type="minutes" value={minutes}></Countdown>
        <Countdown type="seconds" value={seconds}></Countdown>
        <div id="time-left" className="text-opacity-0 text-black absolute ">
          {minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")}
        </div>
      </div>
      {message}
      {quote && quote}
    </div>
  );
}

export default CountdownWrapper;
