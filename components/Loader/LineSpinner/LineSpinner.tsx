import React from "react";
import "./LineSpinner.css";

interface LineSpinnerProps {
  size?: string;
  speed?: string;
  color?: string;
}

const LineSpinner: React.FC<LineSpinnerProps> = ({
  size = "1.2rem",
  speed = "0.9s",
  color = "#ffffff",
}) => {
  return (
      <div className="spinner center">
    <div className="spinner-blade"></div>
    <div className="spinner-blade"></div>
    <div className="spinner-blade"></div>
    <div className="spinner-blade"></div>
    <div className="spinner-blade"></div>
    <div className="spinner-blade"></div>
    <div className="spinner-blade"></div>
    <div className="spinner-blade"></div>
    <div className="spinner-blade"></div>
    <div className="spinner-blade"></div>
    <div className="spinner-blade"></div>
    <div className="spinner-blade"></div>
    </div>
  );
};

export default LineSpinner;
