import React from "react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/outline";

function TimeInput(props) {
  return (
    <div className="form-control mx-3">
      <label className="label justify-center">
        <span className="label-text">{props.label}</span>
      </label>
      <div className="relative">
        <button className="absolute top-0 left-0 rounded-r-none btn btn-primary px-3">
          <PlusCircleIcon className="h-6 w-6  text-neutral-content" />
        </button>
        <input type="text" placeholder={props.label} className="w-full px-2 text-center input input-primary input-bordered" />
        <button className="absolute top-0 right-0 rounded-l-none btn btn-primary px-3">
          <MinusCircleIcon className="h-6 w-6  text-neutral-content" />
        </button>
      </div>
    </div>
  );
}

export default TimeInput;
