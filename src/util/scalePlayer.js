import { NOTE_MAP } from "../constants/notes";
import { play } from "./audioPlayer";

export const playScale = (dataRef, beatIndex = 0) => {

  const {
    tracks,
    bpm,
    notes,
    numBeats,
    isPlaying
  } = dataRef.current;

  if (!isPlaying) {
    return;
  } 

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i][beatIndex];
    const freq = NOTE_MAP[note];
    const duration = tracks[i].noteDuration;
    play(freq, duration);
  }

  const delay = (1 / bpm) * 60 * 1000;
  const newBeatIndex = (beatIndex + 1) % numBeats;
  setTimeout(() => playScale(dataRef, newBeatIndex), delay);
};
