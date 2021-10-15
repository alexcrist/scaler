import _ from 'lodash';
import { NOTES } from "./notes";

export const PITCHES = [
  'C',  'Db', 'D',  'Eb',
  'E',  'F',  'Gb', 'G',
  'Ab', 'A',  'Bb', 'B'
];

export const MODES = [
  {
    name: 'Major',
    steps: [2, 2, 1, 2, 2, 2, 1]
  },
  {
    name: 'Minor',
    steps: [2, 1, 2, 2, 1, 2, 2]
  },
  {
    name: 'Major (pentatonic)',
    steps: [2, 2, 3, 2, 3]
  },
  {
    name: 'Minor (pentatonic)',
    steps: [3, 2, 2, 3, 2]
  }
];

const getScalePitches = (pitch, steps) => {
  let index = PITCHES.indexOf(pitch);
  const scale = steps.map((step) => {
    index = (index + step) % PITCHES.length;
    return PITCHES[index];
  });
  scale.unshift(scale.pop());
  return scale;
};

let scales = [];
for (const pitch of PITCHES) {
  for (const mode of MODES) {
    const scalePitches = getScalePitches(pitch, mode.steps);
    const scaleNotes = NOTES.filter((note) => {
      const notePitch = note.substring(0, note.length - 1);
      return scalePitches.includes(notePitch);
    })
    scales.push({
      name: `${pitch} ${mode.name}`,
      pitches: scalePitches,
      notes: scaleNotes
    })
  }
}

scales = _.sortBy(scales, [
  (o) => o.name.includes('pentatonic') ? 1 : 0,
  (o) => PITCHES.indexOf(o.pitches[0])
]);

export const SCALES = scales;
