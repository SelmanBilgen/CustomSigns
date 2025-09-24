import React, { useState } from "react";
import PreviewCanvas from "./components/PreviewCanvas";
import ControlsRow from "./components/ControlsRow";
import { FONT_OPTIONS, COLOR_OPTIONS, FONT_WIDTH_OPTIONS } from "./options.js";
import { BACKGROUNDS } from "./backgrounds.js";
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
  const [activeCategory, setActiveCategory] = useState("Nursery");
  const [activeBackground, setActiveBackground] = useState(
    BACKGROUNDS.Nursery[0]
  );
  const [showRuler, setShowRuler] = useState(false);

  const handleAddLine = () => {
    if (lines.length < 5) {
      setLines([
        ...lines,
        {
          text: "New Line",
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
      <main className="main-content">
        <div className="canvas-section">
          {/* <header className="header">
            <div className="logo">CustomSigns</div>
            
          </header> */}

          <div className="preview-area">
            <nav className="category-tabs">
              {Object.keys(BACKGROUNDS).map((category) => (
                <button
                  key={category}
                  className={activeCategory === category ? "active" : ""}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveBackground(BACKGROUNDS[category][0]);
                  }}
                >
                  {category}
                </button>
              ))}
            </nav>
            <PreviewCanvas
              lines={lines}
              background={activeBackground}
              showRuler={showRuler}
            />
            <div className="background-options">
              {BACKGROUNDS[activeCategory].map((bg) => (
                <div
                  key={bg}
                  className={`bg-thumbnail ${
                    activeBackground === bg ? "active" : ""
                  }`}
                  style={{ backgroundImage: `url(${bg})` }}
                  onClick={() => setActiveBackground(bg)}
                />
              ))}
            </div>
          </div>
        </div>
        <aside className="controls-section">
          <div className="controls-header">
            <h3>Customize your text</h3>
            <button
              onClick={() => setShowRuler(!showRuler)}
              className="ruler-toggle"
            >
              {showRuler ? "Hide" : "Show"} Ruler
            </button>
          </div>
          <div className="customization-controls">
            {lines.map((line, index) => (
              <ControlsRow
                key={index}
                line={line.text}
                onLineChange={(value) => handleLineChange(index, "text", value)}
                font={line.font}
                onFontChange={(value) => handleLineChange(index, "font", value)}
                color={line.color}
                onColorChange={(value) =>
                  handleLineChange(index, "color", value)
                }
                width={line.width}
                onWidthChange={(value) =>
                  handleLineChange(index, "width", value)
                }
                onDelete={() => handleDeleteLine(index)}
              />
            ))}
            {lines.length < 5 && (
              <button onClick={handleAddLine} className="add-line-btn">
                + Add a new line
              </button>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default App;
