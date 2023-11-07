import React from "react";
import "./CircularProgressBar.css";

function CircularProgressBar({ progreePercentage }) {
  const progressDeg = 360 / (100 / Number(progreePercentage));
  return (
    <div
      style={{
        backgroundImage: `conic-gradient(#fff ${progressDeg}deg, #9c80ff 0deg)`,
      }}
      className="mainCicle shadow"
    >
      <div className="subCircle">
        <div className="progresspercentage">{`${progreePercentage}%`}</div>
      </div>
    </div>
  );
}

export default CircularProgressBar;
