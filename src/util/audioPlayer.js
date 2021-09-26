var AudioContext = window.AudioContext ||
window.webkitAudioContext;

const context = new AudioContext();

const masterVolume = context.createGain();
masterVolume.gain.value = 0.05;
masterVolume.connect(context.destination);

export const play = (freq) => {
  const oscillator = context.createOscillator();
  oscillator.connect(masterVolume);
  oscillator.frequency.setValueAtTime(freq, 0);
  oscillator.start(0);
  setTimeout(() => oscillator.stop(), 100);
};