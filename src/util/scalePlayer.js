import { NOTE_MAP } from "../constants/notes";
import { play } from "./audioPlayer";

let interval;
let playIndex = 1;

export const playScale = (
  notes,
  enabledNotesRef, 
  periodDuration,
  noteDurationRef
) => {

  const numNotes = enabledNotesRef.current.length;

  // Determine frequencies to play
  const freqs = notes.map(note => NOTE_MAP[note]);

  // Play first note
  const freq = freqs[0];
  const isEnabled = enabledNotesRef.current[0];
  if (isEnabled) {
    play(freq, noteDurationRef.current);
  }
  playIndex = 1;

  // Create interval to play future notes
  interval = setInterval(() => {
    const freq = freqs[playIndex];
    const isEnabled = enabledNotesRef.current[playIndex];
    if (isEnabled) {
      play(freq, noteDurationRef.current);
    }
    playIndex = (playIndex + 1) % numNotes;
  }, periodDuration / numNotes);
};

export const stopScale = () => {
  clearInterval(interval);
  playIndex = 0;
};

