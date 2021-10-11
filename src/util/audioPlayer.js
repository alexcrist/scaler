const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

export const play = (freq, noteDuration) => {
  if (typeof freq !== 'number' || isNaN(freq) || !freq) {
    return;
  }
  if (
    noteDuration === undefined ||
    isNaN(noteDuration) ||
    noteDuration < 1
  ) {
    noteDuration = 85;
  }
  const masterVolume = context.createGain();
  masterVolume.gain.setValueCurveAtTime(new Float32Array([0, 0.8, 1, 0.3, 0].map(v => v * 0.05)), context.currentTime, noteDuration / 1000);
  masterVolume.connect(context.destination);
  const oscillator = context.createOscillator();
  oscillator.connect(masterVolume);
  oscillator.frequency.setValueAtTime(freq, 0);
  oscillator.start(0);
  setTimeout(() => oscillator.stop(), noteDuration);
};