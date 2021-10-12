export const play = (
  freq, 
  noteStart, 
  noteDuration,
  masterVolume,
  context
) => {
  freq = Number(freq);
  noteDuration = Number(noteDuration);
  if (isNaN(freq) || freq < 0) {
    return;
  }
  if (isNaN(noteDuration) || noteDuration < 1) {
    return;
  }

  const localVolume = context.createGain();
  localVolume.connect(masterVolume);
  localVolume.gain.setValueCurveAtTime(new Float32Array([0, 0.8, 1, 0.3, 0].map(v => v * 0.05)), context.currentTime + noteStart / 1000, noteDuration / 1000);
  const oscillator = context.createOscillator();
  oscillator.connect(localVolume);
  oscillator.frequency.setValueAtTime(freq, 0);
  oscillator.start(context.currentTime + noteStart / 1000);
  oscillator.stop(context.currentTime + (noteStart + noteDuration) / 1000);
};