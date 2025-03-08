"use client";

import { useEffect, useState } from "react";

interface ProgressBarProps {
  duration: number;
  isActive: boolean;
  onComplete?: () => void;
}

const ProgressBar = ({ duration, isActive, onComplete }: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          //   onComplete();
          return 100;
        }
        return prev + 1;
      });

      return () => clearInterval(interval);
    }, duration / 100);
  }, [isActive, duration, onComplete]);

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
