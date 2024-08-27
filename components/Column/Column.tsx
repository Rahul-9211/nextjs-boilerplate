"use client";
import React, { useState, useEffect } from "react";

interface PropsColumn {
  color?: string;
  blockSize?: number;
  startFrom?: number;
  speed?: number;
}
export default function Column({
  startFrom = 5,
  speed = 200,
  color = "blue",
  blockSize = 10,
}: PropsColumn) {
  const [colorIndex, setColorIndex] = useState(0);
  const characters = `0123456789abcdefghijklmnopqrstuvwxyz`;

  //   const color = "blue"; // The color to be applied
  //   const blockSize = 10; // Number of characters that share the same color
  //   const speed = 200; // Speed of the falling effect (in milliseconds)
  //   const startFrom = 5; // Start the color effect from this index

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex(
        (prevIndex) => (prevIndex + 1) % (characters.length - blockSize)
      );
    }, speed);

    return () => clearInterval(intervalId);
  }, [speed, characters.length]);

  return (
    <div>
      <p className="flex flex-col">
        {characters.split("").map((char, index) => (
          <span
            key={index}
            style={{
              color:
                index >= startFrom + colorIndex &&
                index < startFrom + colorIndex + blockSize
                  ? color
                  : "black",
            }}
          >
            {char}
          </span>
        ))}
      </p>
    </div>
  );
}
