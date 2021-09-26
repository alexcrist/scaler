import _ from 'lodash';
import formulaToData from './formulaToData';

export const calculateNotes = (
  scale,
  numNotes,
  formula,
  lowNote,
  noteRange
) => {
  noteRange = noteRange - 1;

  const minNoteIndex = scale.notes.indexOf(lowNote);

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
      ((maxData - minData) || 1) *
      noteRange
    );
  });

  const notes = noteIndices.map(index => {
    return scale.notes[index + minNoteIndex];
  });

  return notes;
};