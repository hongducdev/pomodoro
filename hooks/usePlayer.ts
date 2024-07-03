import { useEffect } from "react";
import { proxy, useSnapshot } from "valtio";

// Define the base URL and the range of tracks
const BASE_URL = "https://lofi-co-assets.vexcited.com/ogtracks/chill/";
const TRACK_COUNT = 24;

// Helper function to get a random track URL
const getRandomTrackUrl = () => {
  const trackNumber = Math.floor(Math.random() * TRACK_COUNT) + 1;
  return `${BASE_URL}chill_${trackNumber}.mp3`;
};

let audio: HTMLAudioElement | undefined;

interface State {
  canplay: boolean;
  playing: boolean;
  play: () => Promise<void>;
  pause: () => void;
}

const state: State = proxy<State>({
  canplay: false,
  playing: false,
  async play() {
    if (audio) {
      audio.src = getRandomTrackUrl();
      await audio.play();
      state.playing = true;
    }
  },
  pause() {
    if (audio) {
      audio.pause();
      state.playing = false;
    }
  },
});

export const usePlayer = () => {
  useEffect(() => {
    if (!audio) {
      audio = new Audio();

      audio.addEventListener("canplay", () => {
        state.canplay = true;
      });

      audio.addEventListener("ended", () => {
        state.playing = false;
      });
    }

    return () => {
      if (audio) {
        audio.pause();
        audio = undefined;
      }
    };
  }, []);

  const snapshot = useSnapshot(state);
  return snapshot;
};
