import { useState, useEffect } from "react";

const ToggleSwitch = ({isOn, setIsOn}) => {

  return (
    <div
      className={`w-10 h-5 flex items-center rounded-full p-1 lg:h-7 lg:w-14 cursor-pointer transition ${
        isOn ? "bg-secondary-100" : "bg-primary-400"
      }`}
      onClick={() => setIsOn(prev => !prev)}
    >
      <div
        className={`w-3.5 h-3.5 lg:w-5 lg:h-5 bg-primary-100 rounded-full shadow-md transition ${
          isOn ? "translate-x-5 lg:translate-x-7" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
