import { NOTES } from "./notes";

export const SCALES = [
  {
    name: 'C major',
    pitches: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    notes: []
  },
  {
    name: 'D minor',
    pitches: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
    notes: []
  },
  {
    name: 'D major',
    pitches: ['D', 'E', 'Gb', 'G', 'A', 'B', 'Db'],
    notes: []
  },
  {
    name: 'E minor',
    pitches: ['E', 'Gb', 'G', 'A', 'B', 'C', 'D'],
    notes: []
  },
  {
    name: 'E major',
    pitches: ['E', 'Gb', 'G', 'A', 'B', 'C', 'D'],
    notes: []
  },
];

for (const scale of SCALES) {
  for (const note of NOTES) {
    const pitch = note.substring(0, note.length - 1);
    if (scale.pitches.includes(pitch)) {
      scale.notes.push(note);
    }
  }
} 