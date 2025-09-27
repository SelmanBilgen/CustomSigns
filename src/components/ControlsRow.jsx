import React from "react";
import ColorCubes from "./ColorCubes";
import { FONT_OPTIONS, FONT_WIDTH_OPTIONS } from "../options.js";

const ControlsRow = ({
  line,
  onLineChange,
  font,
  onFontChange,
  color,
  onColorChange,
  width,
  onWidthChange,
  onDelete,
}) => {
  return (
    <div className="controls-row">
      {onDelete && (
        <button onClick={onDelete} className="delete-btn">
          &times;
        </button>
      )}
      <input
        type="text"
        value={line}
        onChange={(e) => onLineChange(e.target.value)}
      />
      <div className="row-inputs">
        <select value={font} onChange={(e) => onFontChange(e.target.value)}>
          {FONT_OPTIONS.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              style={{ fontFamily: opt.value }}
            >
              {opt.label}
            </option>
          ))}
        </select>
        <ColorCubes selectedColor={color} onColorChange={onColorChange} />
        <select
          value={width}
          onChange={(e) => onWidthChange(Number(e.target.value))}
        >
          {FONT_WIDTH_OPTIONS.map((opt) => (
            <option key={opt.label} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ControlsRow;