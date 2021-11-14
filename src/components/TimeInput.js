import React, { useEffect, useState } from "react";
import useLongPress from "../hooks/useLongPress";

import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/outline";

function TimeInput({ label, value, setTimeValue, type }) {
  let [val, setVal] = useState(value);
  let min = 0;
  let max = 99;

  const onLongPressPlus = () => {
    handlePlus();
  };

  const onLongPressMinus = () => {
    handleMinus();
  };

  const longPressMinus = useLongPress({ onLongPress: onLongPressMinus, onClick: handleMinus, ms: 300 });
  const longPressPlus = useLongPress({ onLongPress: onLongPressPlus, onClick: handlePlus, ms: 300 });

  function handleMinus() {
    if (val - 1 >= 0) {
      setVal((val) => +val - 1);
    }
  }

  function handlePlus() {
    if (val <= 98) {
      setVal((val) => +val + 1);
    }
  }

  function onChange(e) {
    e.preventDefault();
    let val = e.target.value;
    console.log(e);
    if (val.length < 3) {
      setVal(e.target.value);
    }
  }

  useEffect(() => {
    console.log("effect fire", val);
    if (val < 0) {
      setVal(0);
    } else {
      setTimeValue(type, val);
    }
  }, [val]);

  return (
    <div className="form-control">
      <label className="label justify-center">
        <span className="label-text">{label}</span>
      </label>
      <div className="relative">
        <button className="absolute top-0 left-0 rounded-r-none btn btn-primary px-3" {...longPressPlus}>
          <PlusCircleIcon className="h-6 w-6  text-neutral-content" />
        </button>
        <input type="number" placeholder={label} className="w-40 px-2 text-center input input-primary input-bordered text-base" value={val} min={min} max={max} onChange={onChange} />
        <button className="absolute top-0 right-0 rounded-l-none btn btn-primary px-3" {...longPressMinus}>
          <MinusCircleIcon className="h-6 w-6  text-neutral-content" />
        </button>
      </div>
    </div>
  );
}

export default TimeInput;
