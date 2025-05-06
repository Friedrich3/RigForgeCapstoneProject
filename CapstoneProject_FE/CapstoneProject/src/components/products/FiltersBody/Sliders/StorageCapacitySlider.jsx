import React, { useState, useRef } from 'react';

export default function StorageCapacitySlider({ onChange }) {
  const params = new URLSearchParams(location.search);
  const absoluteMin = 8;
  const absoluteMax = 16000;
  
  const [selectedMin, setSelectedMin] = useState(params.get("minStorage") || 8);
  const [selectedMax, setSelectedMax] = useState(params.get("maxStorage") || 16000);
  
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
      
      const step =2;
      const rawValue = absoluteMin + position * (absoluteMax - absoluteMin);
      
      const newValue = Math.round(rawValue / step) * step;
      
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
    <div className="text-light fw-medium">{selectedMin}GB</div>
    <div className="text-light fw-medium">{selectedMax}GB</div>
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