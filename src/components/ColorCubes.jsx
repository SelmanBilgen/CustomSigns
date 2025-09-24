import React from "react";
import { COLOR_OPTIONS } from "../options.js";

const ColorCubes = ({ selectedColor, onColorChange }) => {
  return (
    <div className="color-cubes">
      {COLOR_OPTIONS.map((opt) => (
        <div
          key={opt.value}
          className={`color-cube ${selectedColor === opt.value ? "selected" : ""}`}
          style={{ backgroundColor: opt.value }}
          onClick={() => onColorChange(opt.value)}
        />
      ))}
    </div>
  );
};

export default ColorCubes;