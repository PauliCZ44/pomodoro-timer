import { useState, useEffect } from "react";

const useAudio = (url, id = "beep") => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  audio.setAttribute("id", id);
  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle, audio];
};

export default useAudio;
