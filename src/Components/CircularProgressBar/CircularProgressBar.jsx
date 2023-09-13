import React from "react";
import "./CircularProgressBar.css";

function CircularProgressBar({ progreePercentage }) {
  const progressDeg = 360 / (100 / Number(progreePercentage));
  return (
    <div className="position-absolute end-0 bottom-0 m-2">
      <div
        style={{
          backgroundImage: `conic-gradient(#fff ${progressDeg}deg, #9c80ff 0deg)`,
        }}
        className="mainCicle"
      >
        <div className="subCircle">
          <div className="progresspercentage">{`${progreePercentage}%`}</div>
        </div>
      </div>
    </div>
  );
}

export default CircularProgressBar;
