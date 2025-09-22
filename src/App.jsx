import React, { useState } from "react";
import "./App.css";
import PreviewCanvas from "./components/PreviewCanvas";

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
];
const INCH_TO_PX = 96;
const FONT_SIZE_OPTIONS = Array.from({ length: 9 }, (_, i) => {
  const inch = 12 + i * 6;
  return { label: `${inch}”`, value: (inch * INCH_TO_PX) / 10 };
});

function App() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [font1, setFont1] = useState(FONT_OPTIONS[0].value);
  const [font2, setFont2] = useState(FONT_OPTIONS[0].value);
  const [color1, setColor1] = useState(COLOR_OPTIONS[0].value);
  const [color2, setColor2] = useState(COLOR_OPTIONS[0].value);
  const [line1FontSize, setLine1FontSize] = useState(
    FONT_SIZE_OPTIONS[0].value
  );
  const [line2FontSize, setLine2FontSize] = useState(
    FONT_SIZE_OPTIONS[0].value
  );
  const [background, setBackground] = useState("");
  const [showGrid, setShowGrid] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 100, y: 100 });

  // Handle background upload
  const handleBgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setBackground(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app-container">
      {/* Top Controls Panel */}
      <header className="controls-panel">
        <div className="logo">CustomSigns</div>
        <nav className="category-tabs">
          <button>Nursery</button>
          <button>Wedding</button>
          <button>Home Décor</button>
          <button>Business</button>
        </nav>
        <div className="customization-controls">
          <div>
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
              <select
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
              >
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
              Size:
              <select
                value={line1FontSize}
                onChange={(e) => setLine1FontSize(Number(e.target.value))}
              >
                {FONT_SIZE_OPTIONS.map((opt) => (
                  <option key={opt.label} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
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
              <select
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
              >
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
              Size:
              <select
                value={line2FontSize}
                onChange={(e) => setLine2FontSize(Number(e.target.value))}
              >
                {FONT_SIZE_OPTIONS.map((opt) => (
                  <option key={opt.label} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {/* Removed canvas size, grid, and CTA buttons */}
        </div>
      </header>
      {/* Center Preview Canvas */}
      <main className="preview-area">
        <PreviewCanvas
          line1={line1}
          line2={line2}
          font1={font1}
          color1={color1}
          font2={font2}
          color2={color2}
          line1FontSize={line1FontSize}
          line2FontSize={line2FontSize}
        />
      </main>
    </div>
  );
}

export default App;
