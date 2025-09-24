import React, { useState, useRef, useEffect } from "react";

const DraggableText = ({ children, style, initialPosition = { x: 0, y: 0 } }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, initialMouseX: 0, initialMouseY: 0 });
  const nodeRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const parentRect = nodeRef.current.parentElement.getBoundingClientRect();
    dragStartRef.current = {
      startX: position.x,
      startY: position.y,
      initialMouseX: e.clientX - parentRect.left,
      initialMouseY: e.clientY - parentRect.top,
    };
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const parentRect = nodeRef.current.parentElement.getBoundingClientRect();
      const dx = (e.clientX - parentRect.left) - dragStartRef.current.initialMouseX;
      const dy = (e.clientY - parentRect.top) - dragStartRef.current.initialMouseY;
      setPosition({
        x: dragStartRef.current.startX + dx,
        y: dragStartRef.current.startY + dy,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);


  return (
    <div
      ref={nodeRef}
      className="canvas-text"
      style={{
        ...style,
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: "move",
        zIndex: isDragging ? 1000 : 1,
        userSelect: 'none',
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

export default DraggableText;