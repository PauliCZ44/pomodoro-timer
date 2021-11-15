import React from "react";
import TimeInput from "./TimeInput";

function SessionTime({ type, minutes, seconds, header, setTimeValue }) {
  return (
    <div className="bg-white bg-opacity-5 rounded-lg p-md shadow-custom">
      <h5 className="text-center mb-2">{header}</h5>
      <div className="flex flex-wrap gap-y-3 gap-x-5 place-content-center">
        <TimeInput type={type + ".min"} label="Minutes" value={minutes} setTimeValue={setTimeValue}></TimeInput>
        <TimeInput type={type + ".sec"} label="Seconds" value={seconds} setTimeValue={setTimeValue}></TimeInput>
      </div>
    </div>
  );
}

export default SessionTime;
