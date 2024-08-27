import React from "react";
import "./DotSpinner.css";

interface DotSpinnerProps {
  size?: string;
  speed?: string;
  color?: string;
}

const DotSpinner: React.FC<DotSpinnerProps> = ({
  size = "1.2rem",
  speed = "0.9s",
  color = "#ffffff",
}) => {
  return (
    <div
      className="dot-spinner"
      style={{
        "--uib-size": size,
        "--uib-speed": speed,
        "--uib-color": color,
      } as React.CSSProperties}
    >
      {[...Array(8)].map((_, i) => (
        <div key={i} className="dot-spinner__dot"></div>
      ))}
    </div>
  );
};

export default DotSpinner;
