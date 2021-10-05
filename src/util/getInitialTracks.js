const getInitialTracks = () => {
  return [
    {
      formula: 'y = sin(x)',
      bpm: 80,
      numBeats: 8,
      scale: 'Major',
      lowNote: 'D3',
      noteRange: 14,
      noteDuration: 120
    }, 
    {
      formula: 'y = cos(x)',
      bpm: 80,
      numBeats: 8,
      scale: 'Major',
      lowNote: 'D3',
      noteRange: 14,
      noteDuration: 120
    }
  ];
}

export default getInitialTracks;