import React from "react";
import TimeInput from "./TimeInput";

function SessionTime({ type, minutes, seconds, header, setTimeValue, id }) {
  return (
    <div className="w-full bg-white bg-opacity-5 p-md py-4" id={id + "-label"}>
      <h5 className="text-center mb-2 text-lg md:text-xl font-semibold opacity-90">{header}</h5>
      <div className="flex flex-wrap gap-y-3 gap-x-5 place-content-center">
        <TimeInput type={type + ".min"} label="Minutes" value={minutes} setTimeValue={setTimeValue} id={id}></TimeInput>
        <TimeInput type={type + ".sec"} label="Seconds" value={seconds} setTimeValue={setTimeValue}></TimeInput>
      </div>
    </div>
  );
}

export default SessionTime;
