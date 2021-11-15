import React, { useEffect, useState } from "react";
import Countdown from "./Countdown";
import TimeInput from "./TimeInput";
import SessionTime from "./SessionTime";
import CountdownWrapper from "./CountdownWrapper";

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
  const [intervalId, setIntervalId] = useState(0);
  const [counterStatus, setCounterStatus] = useState("RESETED");
  const [prevCounterStatus, setPrevCounterStatus] = useState("WORKING");

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
  }

  const startCountDown = () => {
    setSeconds((seconds) => seconds - 1);
    setIsCounting(true);
    setCounterStatus(prevCounterStatus);
    const intervalID = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    setIntervalId(intervalID);
  };

  /* Watching for seconds changes */
  useEffect(() => {
    console.log(minutes, ":", seconds);
    if (seconds === -1 && minutes !== 0) {
      setMinutes((minutes) => minutes - 1);
      setSeconds(59);
    } else if (seconds === -1 && minutes === 0) {
      console.log("Switch status");
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
    setPrevCounterStatus("WORKING");
    setSeconds(workTime.sec);
    setMinutes(workTime.min);
  };

  const switchToWork = () => {
    setPrevCounterStatus("WORKING");
    setCounterStatus("WORKING");
    setMinutes(workTime.min);
    setSeconds(workTime.sec);
  };

  const switchToRest = () => {
    setPrevCounterStatus("RESTING");
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
      <div className="flex gap-5 md:gap-16 justify-items-end">
        <SessionTime header="Working session length" type="work" minutes={workTime.min} seconds={workTime.sec} setTimeValue={setTimeValue} />
        <SessionTime header="Resting session length" type="rest" minutes={workTime.min} seconds={workTime.sec} setTimeValue={setTimeValue} />
      </div>
      <CountdownWrapper minutes={minutes} seconds={seconds} counterStatus={counterStatus} />
      <div className="flex p-4 gap-5 place-content-center justify-center">
        <button className="btn btn-lg btn-primary shadow-button" onClick={toggleCount}>
          {playButton}
        </button>
        <button className="btn btn-lg btn-accent shadow-button" onClick={resetCountdown}>
          <StopIcon className="h-6 w-6 mr-2" />
          Reset
        </button>
      </div>
    </div>
  );
}

export default Main;
