const getInitialTracks = () => {
  return [
    {
      formula: 'y = sin(x)',
      noteDuration: 80,
      disabledBeats: []
    }, 
    {
      formula: 'y = (1 / (x + 0.5)) * cos(4 * x) - 2',
      noteDuration: 300,
      disabledBeats: []
    }
  ];
}

export default getInitialTracks;