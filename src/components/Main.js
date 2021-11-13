import React, { useEffect, useState } from "react";
import Countdown from "./Countdown";
import TimeInput from "./TimeInput";

import { PauseIcon, PlayIcon, StopIcon } from "@heroicons/react/outline";

function Main(props) {
  let initValues = {
    sec: 0,
    min: 25,
  };
  const [seconds, setSeconds] = useState(initValues.sec);
  const [minutes, setMinutes] = useState(initValues.min);
  //const [mils, setMils] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  const [intervalId, setIntervalId] = useState(0);

  const toggleCount = () => {
    if (isCounting) {
      pauseCounting();
      return;
    }
    startCountDown();
  };

  const startCountDown = () => {
    if (!isCounting) {
      setSeconds((seconds) => seconds - 1);
      setIsCounting(true);
      const intervalID = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      setIntervalId(intervalID);
    }
  };

  /* Watching for seconds changes */
  useEffect(() => {
    if (seconds === -1) {
      console.log("zero sec");
      setMinutes((minutes) => minutes - 1);
      setSeconds(59);
    }
  }, [seconds]);

  const pauseCounting = () => {
    setIsCounting(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }
  };

  const resetCountdown = () => {
    pauseCounting();
    setSeconds(initValues.sec);
    setMinutes(initValues.min);
  };

  let pauseButton = (
    <>
      <PauseIcon className="h-6 w-6 mr-2" /> Pause
    </>
  );

  let playButton = (
    <>
      <PlayIcon className="h-6 w-6 mr-2" /> Play
    </>
  );

  return (
    <div className="sm:place-self-center">
      <div className="flex flex-wrap gap-5 p-4 m-4 place-content-center">
        <TimeInput type="minutes" label="Minutes"></TimeInput>
        <TimeInput type="seconds" label="Seconds"></TimeInput>
      </div>

      <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center  bg-white bg-opacity-5 py-12 my-12 rounded-lg">
        <Countdown type="minutes" value={minutes}></Countdown>
        <Countdown type="seconds" value={seconds}></Countdown>
      </div>
      <div className="flex p-4 gap-5 place-content-center justify-center">
        <button className="btn btn-lg btn-primary" onClick={toggleCount}>
          {isCounting ? pauseButton : playButton}
        </button>
        <button className="btn btn-lg btn-accent" onClick={resetCountdown}>
          <StopIcon className="h-6 w-6 mr-2" />
          Reset
        </button>
      </div>
    </div>
  );
}

export default Main;
