import { COLORS } from '../constants/colors';
import { SCALES } from '../constants/scales';
import { fromHash } from './stateHasher';
import { loadLocal } from './localStorage';

const defaultData = {
  bpm: 60,
  numBeats: 16,
  noteRange: 14,
  scale: SCALES[3],
  lowNote: 'E3',
  tracks: [
    {
      color: COLORS[0],
      formula: 'y = min(sin(x), cos(x))',
      noteDuration: 20,
      disabledBeats: [1, 4, 7, 9, 10, 15],
      isMuted: false
    },
    {
      color: COLORS[1],
      formula: 'y = (1 / (x + 0.5)) * cos(4x) - 2',
      noteDuration: 90,
      disabledBeats: [0, 2, 5, 6, 10, 12, 13],
      isMuted: false
    },
    {
      color: COLORS[2],
      formula: 'y = 0',
      noteDuration: 60,
      disabledBeats: [0, 6, 9, 13],
      isMuted: false
    },
  ]
};

export const loadInitialState = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let data = urlParams.get('d');
  if (data) {
    return fromHash(data);
  }
  data = loadLocal();
  if (data) {
    return data;
  }
  return defaultData;
};
