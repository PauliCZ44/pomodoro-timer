import React, { useEffect, useState } from "react";
import Countdown from "./Countdown";
import TimeInput from "./TimeInput";

import { PauseIcon, PlayIcon, StopIcon } from "@heroicons/react/outline";

function Main(props) {
  const [workTime, setWorkTime] = useState({
    min: 25,
    sec: 0,
  });
  const [restTime, setrestTime] = useState({
    min: 5,
    sec: 0,
  });

  const [seconds, setSeconds] = useState(workTime.sec);
  const [minutes, setMinutes] = useState(workTime.min);

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
    switch (type) {
      case "work.min":
        setWorkTime({ ...workTime, min: val });
        if (!isCounting) setMinutes(val);
        break;
      case "work.sec":
        setWorkTime({ ...workTime, sec: val });
        if (!isCounting) setSeconds(val);
        break;
      case "rest.min":
        setrestTime({ ...restTime, min: val });
        break;
      case "rest.sec":
        setrestTime({ ...restTime, sec: val });
        break;

      default:
        break;
    }
    console.log(workTime, restTime);
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
    console.log(minutes, ":", seconds);
    if (seconds === -1 && minutes != 0) {
      setMinutes((minutes) => minutes - 1);
      setSeconds(59);
    } else if (seconds === -1 && minutes === 0) {
      if (counterStatus === "WORKING") {
        switchToRest();
      } else if (counterStatus === "RESTING") {
        switchToWork();
      }
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
    setSeconds(workTime.sec);
    setMinutes(workTime.min);
  };

  const switchToWork = () => {
    setCounterStatus("WORKING");
    setMinutes(workTime.min);
    setSeconds(workTime.sec);
  };

  const switchToRest = () => {
    setCounterStatus("RESTING");
    setMinutes(restTime.min);
    setSeconds(restTime.sec);
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
      <h4 className="text-center ">Work time</h4>
      <div className="flex flex-wrap gap-5 pb-4 mb-4 place-content-center">
        <TimeInput type="work.min" label="Minutes" value={workTime.min} setTimeValue={setTimeValue}></TimeInput>
        <TimeInput type="work.sec" label="Seconds" value={workTime.sec} setTimeValue={setTimeValue}></TimeInput>
      </div>

      <h4 className="text-center">Break time</h4>
      <div className="flex flex-wrap gap-5 pb-4 mb-4 place-content-center">
        <TimeInput type="rest.min" label="Minutes" value={restTime.min} setTimeValue={setTimeValue}></TimeInput>
        <TimeInput type="rest.sec" label="Seconds" value={restTime.sec} setTimeValue={setTimeValue}></TimeInput>
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
