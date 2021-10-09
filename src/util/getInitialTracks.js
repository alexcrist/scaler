import { COLORS } from '../constants/colors';

const getInitialTracks = () => {
  return [
    {
      color: COLORS[0],
      formula: 'y = sin(x)',
      noteDuration: 80,
      disabledBeats: [],
      isMuted: false
    }, 
    {
      color: COLORS[1],
      formula: 'y = (1 / (x + 0.5)) * cos(4 * x) - 2',
      noteDuration: 300,
      disabledBeats: [],
      isMuted: false
    }
  ];
}

export default getInitialTracks;