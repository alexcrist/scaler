import { NOTES } from "./notes";

export const SCALES = [
  {
    name: 'C major',
    pitches: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  },
  {
    name: 'D minor',
    pitches: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C']
  },
  {
    name: 'D major',
    pitches: ['D', 'E', 'Gb', 'G', 'A', 'B', 'Db']
  },
  {
    name: 'E minor',
    pitches: ['E', 'Gb', 'G', 'A', 'B', 'C', 'D']
  },
  {
    name: 'E major',
    pitches: ['E', 'Gb', 'G', 'A', 'B', 'C', 'D']
  },
  {
    name: 'F minor',
    pitches: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb']
  },
  {
    name: 'F major',
    pitches: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E']
  },
  {
    name: 'G minor',
    pitches: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F']
  },
  {
    name: 'G major',
    pitches: ['G', 'A', 'B', 'C', 'D', 'E', 'Gb']
  },
  {
    name: 'A minor',
    pitches: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  },
  {
    name: 'A major',
    pitches: ['A', 'B', 'Db', 'D', 'E', 'Gb', 'Ab']
  },
  {
    name: 'B minor',
    pitches: ['B', 'Db', 'D', 'E', 'Gb', 'G', 'A']
  },
  {
    name: 'B major',
    pitches: ['B', 'Db', 'Eb', 'E', 'Gb', 'Ab', 'Bb']
  }
].map((scale) => {
  scale.notes = [];
  for (const note of NOTES) {
    const pitch = note.substring(0, note.length - 1);
    if (scale.pitches.includes(pitch)) {
      scale.notes.push(note);
    }
  }
  return scale;
});