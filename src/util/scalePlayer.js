import { NOTE_MAP } from '../constants/notes';
import { play } from './audioPlayer';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
let masterVolume;

let numPlays = 0;

const numLoopsToQueue = 4;

export const playScale = (dataRef, wasPlaying = false, playId = numPlays) => {

  const {
    tracks,
    bpm,
    notes,
    numBeats,
    isPlaying,
  } = dataRef.current;

  // Explanation of 'playId !== numPlays':
  //   If the user stops then starts the scale without major delay,
  //   the stopped scale will restart again seeing that isPlaying === true.
  //   To get around this, we incorporate a 'playId' system where each call to
  //   playScale() is associated with a unique ID so we know only to play the
  //   latest call.
  if (!isPlaying || playId !== numPlays) {
    return;
  }

  if (!wasPlaying) {
    numPlays++;
    playId = numPlays;
    masterVolume = context.createGain();
    masterVolume.connect(context.destination);
  }

  const msPerBeat = (1 / (bpm * 4)) * 60 * 1000;
  const msPerLoop = msPerBeat * numBeats;

  // Queue multiple loops at a time to avoid setTimeout() unrelability
  for (let i = 0; i < numLoopsToQueue; i++) {

    for (let j = 0; j < notes.length; j++) {
      const { noteDuration, isMuted, disabledBeats } = tracks[j];

      for (let k = 0; k < notes[j].length; k++) {
        const note = notes[j][k];
        const freq = NOTE_MAP[note];
        const isBeatDisabled = disabledBeats.includes(k);
        const noteStart = i * msPerLoop + k * msPerBeat;
        if (!isMuted && !isBeatDisabled && noteDuration) {
          play(
            freq,
            noteStart,
            noteDuration,
            masterVolume,
            context
          );
        }
      }
    }
  }

  // Multiply BPM times four to represent quarter
  const delay = msPerLoop * numLoopsToQueue;
  setTimeout(() => playScale(dataRef, true, playId), delay);
};

export const stopScale = () => {
  if (masterVolume) {
    masterVolume.disconnect();
  }
};