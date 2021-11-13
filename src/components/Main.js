import React, { useState } from "react";
import Countdown from "./Countdown";

function Main(props) {
  return (
    <div className="place-self-center">
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <Countdown type="hours"></Countdown>
        <Countdown type="minutes"></Countdown>
        <Countdown type="seconds"></Countdown>
      </div>
      <div className="flex p-4 place-content-center">
        <button className="btn butn-primary">Play</button>
        <button className="btn butn-primary">Pause</button>
        <button className="btn butn-primary">Reset</button>
      </div>
    </div>
  );
}

export default Main;
