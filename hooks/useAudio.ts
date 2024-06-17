import { useRef, useEffect } from "react";

const useAudio = (src: string, options = { loop: false }) => {
  const audioRef = useRef(new Audio(src));

  useEffect(() => {
    if (options.loop) {
      audioRef.current.loop = true;
    }
  }, [options.loop]);

  const play = () => {
    audioRef.current.play().catch((error) => {
      console.error(`Failed to play audio from ${src}:`, error);
    });
  };

  const pause = () => {
    audioRef.current.pause();
  };

  const reset = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return { play, pause, reset, audioRef };
};

export default useAudio;
