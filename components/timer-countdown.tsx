"use client";

import { useRef, useState, useEffect } from "react";
import { Pause, Play, RotateCw, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "@/components/ui/progress";
import useAudio from "@/hooks/useAudio";
import useNotification from "@/hooks/useNotification";

interface TimerCountdownProps {
  initialMinutes?: number;
  initialSeconds?: number;
}

const TimerCountdown = ({
  initialMinutes = 25,
  initialSeconds = 0,
}: TimerCountdownProps) => {
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [time, setTime] = useState({
    minutes: initialMinutes,
    seconds: initialSeconds,
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
  const totalTime = initialMinutes * 60 + initialSeconds;

  useEffect(() => {
    if (isStarted && !isComplete) {
      playTickingSound();
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => {
          const newTime = { ...prevTime };
          if (newTime.seconds === 0) {
            if (newTime.minutes === 0) {
              clearInterval(intervalRef.current!);
              pauseTickingSound();
              resetTickingSound();
              playCompleteSound();
              sendNotification();
              setIsComplete(true);
              setIsStarted(false);
              return { minutes: 0, seconds: 0 };
            } else {
              newTime.minutes -= 1;
              newTime.seconds = 59;
            }
          } else {
            newTime.seconds -= 1;
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
    pauseTickingSound,
    playCompleteSound,
    playTickingSound,
    resetTickingSound,
    sendNotification,
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
    clearInterval(intervalRef.current!);
    setTime({ minutes: initialMinutes, seconds: initialSeconds });
    setElapsedTime(0);
    resetTickingSound();
  };

  const progressValue = ((totalTime - elapsedTime) / totalTime) * 100;

  return (
    <div className="my-20 flex flex-col items-center justify-center">
      <div className="flex items-center space-x-2 text-8xl">
        <span>{String(time.minutes).padStart(2, "0")}</span>
        <span>:</span>
        <span>{String(time.seconds).padStart(2, "0")}</span>
      </div>
      <div className="mt-5 w-[350px]">
        <Progress value={progressValue} />
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
        <Button variant="ghost">
          <Settings />
        </Button>
      </div>
    </div>
  );
};

export default TimerCountdown;
