"use client";
import { usePlayer } from "@/hooks/usePlayer";
import { Pause, Play } from "lucide-react";

const PlayLofi = () => {
  const { playing, play, pause } = usePlayer();

  const handleClick = () => {
    if (playing) {
      pause();
    } else {
      play();
    }
  };
  return (
    <div onClick={handleClick}>
      {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
    </div>
  );
};

export default PlayLofi;
