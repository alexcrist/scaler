import _ from 'lodash';
import { formulaToData } from './formulaEvaluator';

export const calculateNotes = (
  tracks,
  numBeats,
  noteRange,
  scale,
  lowNote
) => {
  const minNoteIndex = scale.notes.indexOf(lowNote);

  const xValues = [];
  for (let i = 0; i < numBeats; i++) {
    xValues.push(i / numBeats * 2 * Math.PI);
  }

  const yValuesArray = tracks.map(({ formula }) => {
    try {
      const data = formulaToData(formula, xValues);
      return data.yValues;
    } catch (e) {
      return [];
    }
  });

  const yMin = _(yValuesArray).flatten().min();
  const yMax = _(yValuesArray).flatten().max();

  const notesArray = yValuesArray.map((yValues) => {

    const noteIndices = yValues.map((y) => {
      return Math.round(
        (y - yMin) / 
        ((yMax - yMin) || 1) *
        (noteRange - 1)
      );
    });

    const notes = noteIndices.map((index) => {
      return scale.notes[index + minNoteIndex];
    });

    return notes;
  });

  return notesArray;
};
