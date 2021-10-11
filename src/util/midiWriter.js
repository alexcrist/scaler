import MidiWriter from 'midi-writer-js';

const msToTicks = (ms, bpm) => {
  const tempo = Math.round((60 * 1000000) / bpm);
  const ticksPerBeat = 128;
  const seconds = ms / 1000;
  const ticks = Math.round(seconds / (tempo * 1e-6 / ticksPerBeat));
  return ticks;
};

export const toMidiString = ({
  bpm,
  tracks,
  notes
}) => {

  // BPM times four to represent quarter notes
  const msPerBeat = (1 / (bpm * 4)) * 60 * 1000;

  const midiTracks = [];

  for (let i = 0; i < tracks.length; i++) {
    const { noteDuration, disabledBeats } = tracks[i];
    const midiTrack = new MidiWriter.Track();
    midiTrack.setTempo(bpm);

    for (let j = 0; j < notes[i].length; j++) {
      const note = notes[i][j];
      const isDisabled = disabledBeats.includes(j);
      const startMs = j * msPerBeat;

      // Don't allow a note's duration to exceed when the next same note begins
      let maxNoteDuration = Infinity;
      for (let k = j + 1; k < notes[i].length; k++) {
        const nextNote = notes[i][k];
        if (note === nextNote) {
          const nextStartMs = k * msPerBeat;
          maxNoteDuration = nextStartMs - startMs - 1;
          break;
        }
      }

      const duration = Math.min(noteDuration, maxNoteDuration);

      if (!isDisabled) {
        const midiNote = new MidiWriter.NoteEvent({
          pitch: note,
          duration: 'T' + msToTicks(duration, bpm),
          startTick: msToTicks(startMs, bpm)
        });
        midiTrack.addEvent(midiNote);
      }
    }

    midiTracks.push(midiTrack);
  }

  const writer = new MidiWriter.Writer(midiTracks);
  const midiString = writer.dataUri();
  return midiString;
};