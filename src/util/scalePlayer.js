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
    const { noteDuration, isMuted, disabledBeats } = tracks[i];
    const isBeatDisabled = disabledBeats.includes(beatIndex);
    if (!isMuted && !isBeatDisabled && noteDuration) {
      play(freq, noteDuration);
    }
  }

  // Multiply BPM times four to represent quarter
  const delay = (1 / (bpm * 4)) * 60 * 1000;
  const newBeatIndex = (beatIndex + 1) % numBeats;
  setTimeout(() => playScale(dataRef, newBeatIndex), delay);
};
