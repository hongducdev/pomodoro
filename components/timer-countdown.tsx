"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCw } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "@/components/ui/progress";
import useAudio from "@/hooks/useAudio";
import useNotification from "@/hooks/useNotification";

interface TimerCountdownProps {
  initialWorkMinutes?: string;
  initialWorkSeconds?: string;
  initialBreakMinutes?: string;
  initialBreakSeconds?: string;
  background?: string;
}

const TimerCountdown = ({
  initialWorkMinutes = "25",
  initialWorkSeconds = "0",
  initialBreakMinutes = "5",
  initialBreakSeconds = "0",
  background = "bg-summer-dog",
}: TimerCountdownProps) => {
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [time, setTime] = useState({
    minutes: initialWorkMinutes,
    seconds: initialWorkSeconds,
  });
  const [elapsedTime, setElapsedTime] = useState(0);
  const { play: playButtonSound } = useAudio("/sounds/click.mp3");
  const {
    play: playTickingSound,
    pause: pauseTickingSound,
    reset: resetTickingSound,
  } = useAudio("/sounds/ticking-slow.mp3", { loop: true });
  const { play: playCompleteSound } = useAudio("/sounds/timercomplete.mp3");
  const sendNotification = useNotification("Timer Complete!", {
    body: "Your timer has finished.",
  });
  const intervalRef = useRef<number | null>(null);
  const totalTime = isBreak
    ? parseInt(initialBreakMinutes, 10) * 60 + parseInt(initialBreakSeconds, 10)
    : parseInt(initialWorkMinutes, 10) * 60 + parseInt(initialWorkSeconds, 10);

  useEffect(() => {
    if (isStarted && !isComplete) {
      playTickingSound();
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => {
          const newTime = { ...prevTime };
          if (parseInt(newTime.seconds, 10) === 0) {
            if (parseInt(newTime.minutes, 10) === 0) {
              clearInterval(intervalRef.current!);
              pauseTickingSound();
              resetTickingSound();
              playCompleteSound();
              sendNotification();
              if (isBreak) {
                if (cycleCount < 4) {
                  setCycleCount(cycleCount + 1);
                  setTime({
                    minutes: initialWorkMinutes,
                    seconds: initialWorkSeconds,
                  });
                  setIsBreak(false);
                } else {
                  setIsComplete(true);
                }
              } else {
                setTime({
                  minutes: initialBreakMinutes,
                  seconds: initialBreakSeconds,
                });
                setIsBreak(true);
              }
              setIsStarted(false);
              setElapsedTime(0);
              return { minutes: "0", seconds: "0" };
            } else {
              newTime.minutes = String(parseInt(newTime.minutes, 10) - 1);
              newTime.seconds = "59";
            }
          } else {
            newTime.seconds = String(parseInt(newTime.seconds, 10) - 1);
          }
          return newTime;
        });
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      pauseTickingSound();
      resetTickingSound();
    }
    return () => clearInterval(intervalRef.current!);
  }, [
    isStarted,
    isComplete,
    isBreak,
    cycleCount,
    pauseTickingSound,
    playCompleteSound,
    playTickingSound,
    resetTickingSound,
    sendNotification,
    initialWorkMinutes,
    initialWorkSeconds,
    initialBreakMinutes,
    initialBreakSeconds,
  ]);

  const handleStart = () => {
    if (isComplete) {
      handleReset();
    } else {
      setIsStarted(!isStarted);
    }
    playButtonSound();
  };

  const handleReset = () => {
    setIsStarted(false);
    setIsComplete(false);
    setIsBreak(false);
    setCycleCount(0);
    clearInterval(intervalRef.current!);
    setTime({ minutes: initialWorkMinutes, seconds: initialWorkSeconds });
    setElapsedTime(0);
    resetTickingSound();
  };

  const progressValue = ((totalTime - elapsedTime) / totalTime) * 100;

  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      <div className="flex space-x-1 my-2">
        {Array.from({ length: 4 }, (_, i) => (
          <span
            key={i}
            className={`text-2xl ${
              i < cycleCount ? "grayscale-0" : "grayscale"
            }`}
          >
            🍅
          </span>
        ))}
      </div>

      <div className="flex items-center space-x-2 text-8xl">
        <span>{String(time.minutes).padStart(2, "0")}</span>
        <span>:</span>
        <span>{String(time.seconds).padStart(2, "0")}</span>
      </div>
      <div className="mt-5 w-[350px]">
        <Progress value={progressValue} className={background} />
      </div>
      <div className="mt-5 flex items-center space-x-5">
        <Button variant="ghost" onClick={handleStart}>
          {isStarted ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </Button>
        <Button variant="ghost" onClick={handleReset}>
          <RotateCw className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default TimerCountdown;
