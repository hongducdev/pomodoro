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
    <div
      className="group cursor-pointer fixed bottom-10 right-10 bg-summer-dog p-0.5 rounded-full"
      onClick={handleClick}
    >
      <div className="w-14 h-14 rounded-full bg-zinc-900 text-zinc-50 flex items-center justify-center">
        {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </div>
    </div>
  );
};

export default PlayLofi;
