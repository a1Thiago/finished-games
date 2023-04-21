import { useState } from "react";

type ProgressBarProps = {
  progressPercentage?: number;
  darkMode?: boolean;
}

export default function ProgressBar(
  { progressPercentage, darkMode }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [transition, setTransition] = useState(0);

  setTimeout(() => {
    while (progress < 99) {
      setTransition(transition => transition = 1000);
      return setProgress(progress => progress + 25);
    }
    setTransition(transition => transition = 0);
    return setProgress(progress => progress = 0);
  }, 1000);

  const bgClass = darkMode ? 'bg-white' : 'bg-blue-100';
  const barClass = darkMode ? 'bg-blue-500' : (progress < 30 ? 'bg-blue-300' : progress < 70 ? 'bg-blue-450' : 'bg-blue-700');

  return (
    <div className={`h-1 w-full ${bgClass}`}>
      <div
        style={{ width: `${progressPercentage ?? progress}%` }}
        className={`transition-all duration-${transition} h-full max-w-full ${barClass}`}>
      </div>
    </div>
  );
}
