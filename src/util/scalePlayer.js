import _ from 'lodash';
import { NOTES, NOTE_MAP } from "../constants/notes";
import { SCALES } from "../constants/scales";
import { play } from "./audioPlayer";
import formulaToData from './formulaToData';

const D_MAJOR = SCALES[1];
const MIN_NOTE_INDEX = Math.floor(D_MAJOR.notes.length * 0.42);
const NUM_NOTES = 12;

console.log(NOTES[MIN_NOTE_INDEX])

let interval;
let playIndex = 1;

export const playScale = (formula, enabledNotesRef, periodDuration) => {

  const numNotes = enabledNotesRef.current.length;

  const xValues = [];
  for (let i = 0; i < numNotes; i++) {
    xValues.push(i / numNotes * 2 * Math.PI);
  }

  const data = formulaToData(formula, xValues);

  const minData = _.min(data);
  const maxData = _.max(data);

  const noteIndices = data.map(value => {
    return Math.round(
      (value - minData) / 
      (maxData - minData) * 
      NUM_NOTES
    );
  });

  const notes = noteIndices.map(index => {
    return D_MAJOR.notes[index + MIN_NOTE_INDEX];
  });

  const freqs = notes.map(note => NOTE_MAP[note]);

  const freq = freqs[0];
  const isEnabled = enabledNotesRef.current[0];
  if (isEnabled) {
    play(freq);
  }
  playIndex = 1;
  interval = setInterval(() => {
    const freq = freqs[playIndex];
    const isEnabled = enabledNotesRef.current[playIndex];
    if (isEnabled) {
      play(freq);
    }
    playIndex = (playIndex + 1) % numNotes;
  }, periodDuration / numNotes);
};

export const stopScale = () => {
  clearInterval(interval);
  playIndex = 0;
};

