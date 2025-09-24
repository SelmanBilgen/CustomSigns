import React from "react";
import "./Ruler.css";

const Ruler = ({ widthIn, widthCm }) => {
  return (
    <div className="ruler">
      <div className="ruler-line" />
      <div className="ruler-text">
        {widthIn.toFixed(2)}" ({widthCm.toFixed(2)}cm)
      </div>
      <div className="ruler-line" />
    </div>
  );
};

export default Ruler;