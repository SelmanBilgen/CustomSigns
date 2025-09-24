import React, { useState, useEffect } from "react";
import DraggableText from "./DraggableText";
import "./PreviewCanvas.css";

// Constants for wall mapping
const WALL_WIDTH_M = 2.5;
const CANVAS_WIDTH_PX = 1625;
const PX_PER_METER = CANVAS_WIDTH_PX / WALL_WIDTH_M;
const INCH_TO_METER = 0.0254;

function fitFontSize(text, fontFamily, targetWidthPx) {
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
    if (measuredWidth > 0) {
      fontSize = fontSize * (targetWidthPx / measuredWidth);
    }
    tries++;
  } while (Math.abs(measuredWidth - targetWidthPx) > 2 && tries < 10);


  document.body.removeChild(span);
  return fontSize;
}

const Line = ({ text, font, color, width, initialPosition }) => {
  const [fontSize, setFontSize] = useState(40);
  const widthPx = width * INCH_TO_METER * PX_PER_METER;

  useEffect(() => {
    if (text) {
      const size = fitFontSize(text, font, widthPx);
      setFontSize(size);
    }
  }, [text, font, width]);

  return (
    <DraggableText
      initialPosition={initialPosition}
      style={{
        fontFamily: font,
        color: color,
        fontSize: `${fontSize}px`,
        width: `${widthPx}px`,
      }}
    >
      {text}
    </DraggableText>
  );
};

import Ruler from "./Ruler";

function PreviewCanvas({ lines, background, showRuler }) {
  const [totalWidthPx, setTotalWidthPx] = useState(0);

  useEffect(() => {
    const widths = lines.map(
      (line) => line.width * INCH_TO_METER * PX_PER_METER
    );
    setTotalWidthPx(Math.max(...widths));
  }, [lines]);

  const totalWidthIn = totalWidthPx / (INCH_TO_METER * PX_PER_METER);
  const totalWidthCm = totalWidthIn * 2.54;

  return (
    <div
      id="preview-canvas"
      className="preview-canvas"
      style={{
        width: "100%",
        maxWidth: "700px",
        aspectRatio: "1625/1280",
        background: `url(${background}) center center/cover no-repeat`,
        position: "relative",
        overflow: "hidden",
        margin: "0 auto",
        height: "550px",
      }}
    >
      {showRuler && <Ruler widthIn={totalWidthIn} widthCm={totalWidthCm} />}
      {lines.map((line, index) => (
        <Line
          key={index}
          {...line}
          initialPosition={{ x: 20, y: 50 + index * 100 }}
        />
      ))}
    </div>
  );
}

export default PreviewCanvas;