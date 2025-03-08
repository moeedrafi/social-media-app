"use client";

import { useEffect, useState } from "react";

interface ProgressBarProps {
  duration: number;
  onComplete: () => void;
}

const ProgressBar = ({ duration, onComplete }: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        return prev + 100 / (duration / 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="h-1 w-full bg-gray-300">
      <div
        className="h-full bg-blue-500 transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
