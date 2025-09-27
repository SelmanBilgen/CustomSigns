import React, { useState, useRef, useEffect } from "react";

const DraggableText = ({ children, style, initialPosition = { x: 0, y: 0 } }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, initialMouseX: 0, initialMouseY: 0 });
  const nodeRef = useRef(null);

  const handleDragStart = (e) => {
    setIsDragging(true);
    const parentRect = nodeRef.current.parentElement.getBoundingClientRect();
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    dragStartRef.current = {
      startX: position.x,
      startY: position.y,
      initialMouseX: clientX - parentRect.left,
      initialMouseY: clientY - parentRect.top,
    };
    e.preventDefault();
  };

  useEffect(() => {
    const handleDragMove = (e) => {
      if (!isDragging) return;
      const parentRect = nodeRef.current.parentElement.getBoundingClientRect();
      const clientX = e.clientX || e.touches[0].clientX;
      const clientY = e.clientY || e.touches[0].clientY;
      const dx = (clientX - parentRect.left) - dragStartRef.current.initialMouseX;
      const dy = (clientY - parentRect.top) - dragStartRef.current.initialMouseY;
      setPosition({
        x: dragStartRef.current.startX + dx,
        y: dragStartRef.current.startY + dy,
      });
    };

    const handleDragEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleDragMove);
      window.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
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
        userSelect: "none",
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      {children}
    </div>
  );
};

export default DraggableText;