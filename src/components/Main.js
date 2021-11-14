import React, { useEffect, useState } from "react";
import Countdown from "./Countdown";
import TimeInput from "./TimeInput";

import { PauseIcon, PlayIcon, StopIcon } from "@heroicons/react/outline";

function Main(props) {
  let initValues = {
    work: {
      sec: 0,
      min: 25,
    },
    break: {
      sec: 0,
      min: 5,
    },
  };

  const [seconds, setSeconds] = useState(initValues.work.sec);
  const [minutes, setMinutes] = useState(initValues.work.min);

  const [isCounting, setIsCounting] = useState(false);
  const [counterStatus, setCounterStatus] = useState("RESETED");

  const [intervalId, setIntervalId] = useState(0);

  const toggleCount = () => {
    if (isCounting) {
      pauseCounting();
      setCounterStatus("PAUSED");
      return;
    }
    startCountDown();
  };

  function setTimeValue(type, val) {
    let path = type.split(".");
    console.log("set val with", val, type, initValues[path[0]][path[1]]);
    initValues[path[0]][path[1]] = val;
    if (!isCounting && path[0] === "work") {
      if (path[1] === "min") {
        setMinutes(val);
      } else {
        setSeconds(val);
      }
    }
  }

  const startCountDown = () => {
    setSeconds((seconds) => seconds - 1);
    setIsCounting(true);
    setCounterStatus("WORKING");
    const intervalID = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    setIntervalId(intervalID);
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
    setCounterStatus("RESETED");
    setSeconds(initValues.work.sec);
    setMinutes(initValues.work.min);
  };

  let playButton = (
    <>
      <PlayIcon className="h-6 w-6 mr-2" /> Start
    </>
  );

  if (!isCounting && counterStatus === "PAUSED") {
    playButton = (
      <>
        <PlayIcon className="h-6 w-6 mr-2" /> Resume
      </>
    );
  } else if (isCounting) {
    playButton = (
      <>
        <PauseIcon className="h-6 w-6 mr-2" /> Pause
      </>
    );
  }

  return (
    <div className="sm:place-self-center">
      <h4 className="text-center ">Working time</h4>
      <div className="flex flex-wrap gap-5 pb-4 mb-4 place-content-center">
        <TimeInput type="work.min" label="Minutes" value={initValues.work.min} setTimeValue={setTimeValue}></TimeInput>
        <TimeInput type="work.sec" label="Seconds" value={initValues.work.sec} setTimeValue={setTimeValue}></TimeInput>
      </div>

      <h4 className="text-center">Break time</h4>
      <div className="flex flex-wrap gap-5 pb-4 mb-4 place-content-center">
        <TimeInput type="break.min" label="Minutes" value={initValues.break.min} setTimeValue={setTimeValue}></TimeInput>
        <TimeInput type="break.sec" label="Seconds" value={initValues.break.sec} setTimeValue={setTimeValue}></TimeInput>
      </div>

      <div className=" bg-white bg-opacity-5 pt-12 pb-6 my-12 rounded-lg">
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center ">
          <Countdown type="minutes" value={minutes}></Countdown>
          <Countdown type="seconds" value={seconds}></Countdown>
        </div>
        <h3 className="text-center h3 pt-6">{counterStatus}</h3>
      </div>

      <div className="flex p-4 gap-5 place-content-center justify-center">
        <button className="btn btn-lg btn-primary" onClick={toggleCount}>
          {playButton}
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
