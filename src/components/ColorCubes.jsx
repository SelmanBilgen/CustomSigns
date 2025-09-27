import React, { useState } from "react";
import { COLOR_OPTIONS } from "../options.js";

const ColorCubes = ({ selectedColor, onColorChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="color-dropdown">
      <div
        className="selected-color"
        style={{ backgroundColor: selectedColor }}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="color-grid">
          {COLOR_OPTIONS.map((opt) => (
            <div
              key={opt.value}
              className="color-cube"
              style={{ backgroundColor: opt.value }}
              onClick={() => {
                onColorChange(opt.value);
                setIsOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorCubes;