import React from "react";

const FONT_OPTIONS = [
  { label: "Hello Honey", value: "Hello Honey" },
  { label: "Hello Spring", value: "Hello Spring" },
  { label: "Madina", value: "Madina" },
  { label: "Ostrich Sans Inline", value: "Ostrich Sans Inline" },
];

const COLOR_OPTIONS = [
  { label: "Black", value: "#222" },
  { label: "White", value: "#fff" },
  { label: "Orange", value: "#E85A29" },
  { label: "Gray", value: "#888" },
];

const SIZE_OPTIONS = Array.from({ length: 9 }, (_, i) => ({
  label: `${12 + i * 6} inch`,
  value: 12 + i * 6,
}));

function TextCustomizationPanel({
  line1,
  setLine1,
  line2,
  setLine2,
  font1,
  setFont1,
  color1,
  setColor1,
  font2,
  setFont2,
  color2,
  setColor2,
  line1Size,
  setLine1Size,
  line2Size,
  setLine2Size,
}) {
  return (
    <div className="text-customization-panel">
      <div className="line-controls">
        <label>
          Line 1:
          <input
            type="text"
            value={line1}
            onChange={(e) => setLine1(e.target.value)}
          />
        </label>
        <label>
          Font:
          <select value={font1} onChange={(e) => setFont1(e.target.value)}>
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
        </label>
        <label>
          Color:
          <select value={color1} onChange={(e) => setColor1(e.target.value)}>
            {COLOR_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                style={{ color: opt.value }}
              >
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Line 1 Size:
          <select
            value={line1Size}
            onChange={(e) => setLine1Size(Number(e.target.value))}
          >
            {SIZE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="line-controls">
        <label>
          Line 2:
          <input
            type="text"
            value={line2}
            onChange={(e) => setLine2(e.target.value)}
          />
        </label>
        <label>
          Font:
          <select value={font2} onChange={(e) => setFont2(e.target.value)}>
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
        </label>
        <label>
          Color:
          <select value={color2} onChange={(e) => setColor2(e.target.value)}>
            {COLOR_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                style={{ color: opt.value }}
              >
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Line 2 Size:
          <select
            value={line2Size}
            onChange={(e) => setLine2Size(Number(e.target.value))}
          >
            {SIZE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

export default TextCustomizationPanel;
