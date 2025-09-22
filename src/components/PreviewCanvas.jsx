import React, { useState, useEffect } from "react";
import "./PreviewCanvas.css";

// Constants for crib mapping
const CRIB_LENGTH_INCH = 52; // standard crib length
const CRIB_WIDTH_PX = 900;   // measured pixel width of crib in image
const PX_PER_INCH = CRIB_WIDTH_PX / CRIB_LENGTH_INCH;

function fitFontSize(text, fontFamily, targetWidth) {
  // Create a hidden span to measure text width
  const span = document.createElement("span");
  span.style.visibility = "hidden";
  span.style.position = "absolute";
  span.style.whiteSpace = "nowrap";
  span.style.fontFamily = fontFamily;
  document.body.appendChild(span);

  let fontSize = 40;
  let measuredWidth = 0;
  let tries = 0;
  do {
    span.style.fontSize = `${fontSize}px`;
    span.textContent = text;
    measuredWidth = span.offsetWidth;
    fontSize = fontSize * (targetWidth / measuredWidth);
    tries++;
  } while (Math.abs(measuredWidth - targetWidth) > 2 && tries < 10);

  document.body.removeChild(span);
  return fontSize;
}

function PreviewCanvas({
  line1,
  line2,
  font1,
  color1,
  font2,
  color2,
  line1Size = 30, // default 30 inch
  line2Size = 12, // default 12 inch
}) {
  // Canvas dimensions
  const canvasWidth = 1625;
  const canvasHeight = 1280;

  // Default positions
  const defaultLine1Y = 5 * PX_PER_INCH; // 5 inch below top
  const defaultLine1X = (canvasWidth - line1Size * PX_PER_INCH) / 2;
  const defaultLine2Y = defaultLine1Y + 3 * PX_PER_INCH; // 3 inch below line 1
  const defaultLine2X = defaultLine1X + line1Size * PX_PER_INCH - line2Size * PX_PER_INCH; // align end

  // Font size fitting
  const [fontSize1, setFontSize1] = useState(40);
  const [fontSize2, setFontSize2] = useState(40);

  useEffect(() => {
    if (line1) {
      const size = fitFontSize(line1, font1, line1Size * PX_PER_INCH);
      setFontSize1(size);
    }
  }, [line1, font1, line1Size]);

  useEffect(() => {
    if (line2) {
      const size = fitFontSize(line2, font2, line2Size * PX_PER_INCH);
      setFontSize2(size);
    }
  }, [line2, font2, line2Size]);

  return (
    <div
      className="preview-canvas"
      style={{
        width: "100%",
        maxWidth: "700px",
        aspectRatio: "1625/1280",
        background: `url('/nursery-1.webp') center center/cover no-repeat`,
        position: "relative",
        overflow: "hidden",
        margin: "0 auto",
        height: "550px",
      }}
    >
      {/* Line 1 */}
      <div
        className="canvas-text"
        style={{
          position: "absolute",
          left: `${defaultLine1X}px`,
          top: `${defaultLine1Y}px`,
          fontFamily: font1,
          color: color1,
          fontSize: `${fontSize1}px`,
          width: `${line1Size * PX_PER_INCH}px`,
          whiteSpace: "nowrap",
          overflow: "hidden",
          cursor: "move",
        }}
      >
        {line1}
      </div>
      {/* Line 2 */}
      {line2 && (
        <div
          className="canvas-text"
          style={{
            position: "absolute",
            left: `${defaultLine2X}px`,
            top: `${defaultLine2Y}px`,
            fontFamily: font2,
            color: color2,
            fontSize: `${fontSize2}px`,
            width: `${line2Size * PX_PER_INCH}px`,
            whiteSpace: "nowrap",
            overflow: "hidden",
            cursor: "move",
          }}
        >
          {line2}
        </div>
      )}
    </div>
  );
}

export default PreviewCanvas;
