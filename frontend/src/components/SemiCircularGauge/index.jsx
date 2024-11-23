import React from "react";

const SemiCircularGauge = ({ value, color, unit, max = 100 }) => {
  // Ensure value stays within the valid range
  const clampedValue = Math.max(0, Math.min(value, max));

  // Calculate percentage
  const percentage = (clampedValue / max) * 100;

  const radius = 50; // Radius of the circle
  const circumference = Math.PI * radius; // Circumference for 180 degrees (half-circle)
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* SVG Container */}
      <svg
        width="220"
        height="110"
        viewBox="0 0 120 60"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Background Arc */}
        <path
          d="M 10 60 A 50 50 0 0 1 110 60" // Draws the semi-circle
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="5"
        />
        {/* Foreground Arc */}
        <path
          d="M 10 60 A 50 50 0 0 1 110 60" // Same semi-circle path
          fill="none"
          stroke="#4caf50"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {/* Value */}
      <div className="text-center -mt-11">
        <div>
          <span className={`text-4xl font-medium ${color}`}>
            {clampedValue}
          </span>
          <span className={`${color}`}> {unit}</span>
        </div>
      </div>
    </div>
  );
};

export default SemiCircularGauge;
