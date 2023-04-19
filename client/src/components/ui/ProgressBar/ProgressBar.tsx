import { useState } from "react";

type ProgressBarProps = {
  progressPercentage?: number
}

export default function ProgressBar(
  { progressPercentage }: ProgressBarProps
) {

  const [progress, setProgress] = useState(0)

  const [transition, setTransition] = useState(0)

  setTimeout(() => {
    while (progress < 99) {
      setTransition(transition => transition = 1000)
      return setProgress(progress => progress + 50)
    }
    setTransition(transition => transition = 0)
    return setProgress(progress => progress = 0)
  }, 1500)

  return (
    <div className='h-1 w-full bg-blue-100 '>
      <div
        style={{ width: `${progressPercentage ?? progress}%` }}
        className={`transition-all duration-${transition} h-full max-w-full ${progress < 30 ? 'bg-blue-300' : progress < 70 ? 'bg-blue-450' : 'bg-blue-700'}`}>
      </div>
    </div>
  );
}