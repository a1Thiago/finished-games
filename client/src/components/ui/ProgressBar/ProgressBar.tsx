import { useState } from "react";

type ProgressBarProps = {
  progressPercentage?: number
}

export default function ProgressBar(
  { progressPercentage }: ProgressBarProps
) {

  const [progress, setProgress] = useState(0)

  setTimeout(() => {
    if (progress >= 100) {
      return setProgress(progress => progress = 0)
    } else return setProgress(progress => progress + 20)
  }, 1000)

  return (
    <div className='h-1 w-full bg-blue-100 '>
      <div
        style={{ width: `${progressPercentage ?? progress}%` }}
        className={`transition-all duration-1000 h-full max-w-full ${progress < 30 ? 'bg-blue-300' : progress < 70 ? 'bg-blue-450' : 'bg-blue-700'}`}>
      </div>
    </div>
  );
}