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

function PreviewCanvas({
  line1,
  line2,
  font1,
  color1,
  font2,
  color2,
  line1Width = 30, // default 30 inch
  line2Width = 12, // default 12 inch
}) {
  const [fontSize1, setFontSize1] = useState(40);
  const [fontSize2, setFontSize2] = useState(40);

  const line1WidthPx = line1Width * INCH_TO_METER * PX_PER_METER;
  const line2WidthPx = line2Width * INCH_TO_METER * PX_PER_METER;

  useEffect(() => {
    if (line1) {
      const size = fitFontSize(line1, font1, line1WidthPx);
      setFontSize1(size);
    }
  }, [line1, font1, line1Width]);

  useEffect(() => {
    if (line2) {
      const size = fitFontSize(line2, font2, line2WidthPx);
      setFontSize2(size);
    }
  }, [line2, font2, line2Width]);

  return (
    <div
      id="preview-canvas"
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
      <DraggableText
        initialPosition={{ x: 20, y: 50 }}
        style={{
          fontFamily: font1,
          color: color1,
          fontSize: `${fontSize1}px`,
          width: `${line1WidthPx}px`,
        }}
      >
        {line1}
      </DraggableText>
      {line2 && (
        <DraggableText
          initialPosition={{ x: 20, y: 150 }}
          style={{
            fontFamily: font2,
            color: color2,
            fontSize: `${fontSize2}px`,
            width: `${line2WidthPx}px`,
          }}
        >
          {line2}
        </DraggableText>
      )}
    </div>
  );
}

export default PreviewCanvas;