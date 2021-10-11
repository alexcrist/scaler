const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

export const play = (freq, noteDuration) => {
  freq = Number(freq);
  noteDuration = Number(noteDuration);
  if (isNaN(freq) || freq < 0) {
    return;
  }
  if (isNaN(noteDuration) || noteDuration < 1) {
    return;
  }

  const masterVolume = context.createGain();
  masterVolume.connect(context.destination);
  masterVolume.gain.setValueCurveAtTime(new Float32Array([0, 0.8, 1, 0.3, 0].map(v => v * 0.05)), context.currentTime, noteDuration / 1000);
  const oscillator = context.createOscillator();
  oscillator.connect(masterVolume);
  oscillator.frequency.setValueAtTime(freq, 0);
  oscillator.start(context.currentTime);
  oscillator.stop(context.currentTime + noteDuration / 1000);
};