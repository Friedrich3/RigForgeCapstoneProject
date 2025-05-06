import React, { useState, useRef } from 'react';

export default function PsuWattageSlider({ onChange }) {
  const params = new URLSearchParams(location.search);
  const absoluteMin = 200;
  const absoluteMax = 2200;
  
  const [selectedMin, setSelectedMin] = useState(params.get("minWattage") || 200);
  const [selectedMax, setSelectedMax] = useState(params.get("maxWattage") || 2200);
  
  const trackRef = useRef(null);
  const minThumbRef = useRef(null);
  const maxThumbRef = useRef(null);
  
  const calculatePosition = (value) => {
    return ((value - absoluteMin) / (absoluteMax - absoluteMin)) * 100;
  };
  
  const handleThumbDrag = (e, isMin) => {
    if (!trackRef.current) return;
    
    const trackRect = trackRef.current.getBoundingClientRect();
    const trackWidth = trackRect.width;
    const trackLeft = trackRect.left;
    
    const handleMouseMove = (moveEvent) => {
      let position = (moveEvent.clientX - trackLeft) / trackWidth;
      position = Math.max(0, Math.min(1, position));
      
      const newValue = Math.round(absoluteMin + position * (absoluteMax - absoluteMin));
      
      if (isMin) {
        const newMin = Math.min(newValue, selectedMax);
        setSelectedMin(newMin);
        onChange?.(newMin, selectedMax); // ✅ safe: selectedMax è stabile
      } else {
        const newMax = Math.max(newValue, selectedMin);

    // FIX: aggiorna selectedMax prima, poi chiama onChange dopo effettiva modifica
        setSelectedMax(() => {
          onChange?.(selectedMin, newMax); // ✅ safe: dentro callback
          return newMax;
        
    });
  }
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  return (
    <div className="position-relative" style={{ height: "64px" }}>
  <div className="d-flex justify-content-between mb-2">
    <div className="text-light fw-medium">{selectedMin}W</div>
    <div className="text-light fw-medium">{selectedMax}W</div>
  </div>

  <div
    ref={trackRef}
    className="position-relative bg-secondary rounded-pill"
    style={{ height: "6px", width: "100%" }}
  >
    {/* Barra attiva (tra i due thumb) */}
    <div
      className="position-absolute bg-primary rounded-pill"
      style={{
        height: "6px",
        left: `${calculatePosition(selectedMin)}%`,
        width: `${calculatePosition(selectedMax) - calculatePosition(selectedMin)}%`
      }}
    ></div>

    {/* Thumb min */}
    <div
      ref={minThumbRef}
      className="position-absolute bg-secondary rounded-circle"
      style={{
        width: "16px",
        height: "16px",
        top: "-5px",
        left: `${calculatePosition(selectedMin)}%`,
        cursor: "pointer"
      }}
      onMouseDown={(e) => handleThumbDrag(e, true)}
    ></div>

    {/* Thumb max */}
    <div
      ref={maxThumbRef}
      className="position-absolute bg-secondary rounded-circle"
      style={{
        width: "16px",
        height: "16px",
        top: "-5px",
        left: `${calculatePosition(selectedMax)}%`,
        cursor: "pointer"
      }}
      onMouseDown={(e) => handleThumbDrag(e, false)}
    ></div>
  </div>
</div>

  );
}