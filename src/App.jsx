import React, { useState } from "react";
import PreviewCanvas from "./components/PreviewCanvas";
import ControlsRow from "./components/ControlsRow";
import {
  FONT_OPTIONS,
  COLOR_OPTIONS,
  FONT_WIDTH_OPTIONS,
} from "./options.js";
import "./App.css";

const App = () => {
  const [lines, setLines] = useState([
    {
      text: "Hello",
      font: FONT_OPTIONS[0].value,
      color: COLOR_OPTIONS[0].value,
      width: FONT_WIDTH_OPTIONS[0].value,
    },
  ]);

  const handleAddLine = () => {
    if (lines.length < 2) {
      setLines([
        ...lines,
        {
          text: "World",
          font: FONT_OPTIONS[0].value,
          color: COLOR_OPTIONS[0].value,
          width: FONT_WIDTH_OPTIONS[0].value,
        },
      ]);
    }
  };

  const handleDeleteLine = (index) => {
    const newLines = [...lines];
    newLines.splice(index, 1);
    setLines(newLines);
  };

  const handleLineChange = (index, property, value) => {
    const newLines = [...lines];
    newLines[index][property] = value;
    setLines(newLines);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">CustomSigns</div>
        <nav className="category-tabs">
          <button>Nursery</button>
          <button>Wedding</button>
          <button>Home Décor</button>
          <button>Business</button>
        </nav>
      </header>

      <main className="preview-area">
        <PreviewCanvas lines={lines} />
      </main>

      <footer className="controls-panel">
        <div className="customization-controls">
          {lines.map((line, index) => (
            <ControlsRow
              key={index}
              line={line.text}
              onLineChange={(value) => handleLineChange(index, "text", value)}
              font={line.font}
              onFontChange={(value) => handleLineChange(index, "font", value)}
              color={line.color}
              onColorChange={(value) => handleLineChange(index, "color", value)}
              width={line.width}
              onWidthChange={(value) => handleLineChange(index, "width", value)}
              onDelete={index > 0 ? () => handleDeleteLine(index) : null}
            />
          ))}
          {lines.length < 2 && (
            <button onClick={handleAddLine} className="add-line-btn">
              + Add a new line
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default App;