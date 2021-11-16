import React, { useState } from "react";

function Settings(props) {
  const [isHidden, setIsHidden] = useState(true);
  const handleInputChange = () => {
    setIsHidden(!isHidden);
  };
  return (
    <>
      <div className={props.class + " collapse border border-opacity-25 rounded-box border-base-300 collapse-arrow my-5  shadow-custom"}>
        <input type="checkbox" checked={isHidden} onChange={handleInputChange} className="hover:bg-black" />
        <div className="collapse-title text-sm font-medium flex items-center bg-gray-400 shadow-custom">{isHidden ? "Hide" : "Show"} settings</div>
        <div className="collapse-content px-0 py-0">{props.children}</div>
      </div>
    </>
  );
}

export default Settings;
