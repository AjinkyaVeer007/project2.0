import React from "react";

function CustomButton({
  name,
  preIcon,
  postIcon,
  bgColor,
  color,
  handleClick,
}) {
  return (
    <div
      className={`d-grid customBtn ${bgColor} ${bgColor ? "" : "border"} ${
        color ? color : "text-white"
      } py-1 px-2 rounded cursor-pointer`}
      onClick={handleClick}
    >
      <div className="d-flex align-items-center justify-content-center gap-2">
        {preIcon && <div>{preIcon}</div>}
        <div>{name}</div>
        {postIcon && <div>{postIcon}</div>}
      </div>
    </div>
  );
}

export default CustomButton;
