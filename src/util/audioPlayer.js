import { NOTE_MAP } from '../constants/notes';

const NUM_LOOPS_TO_QUEUE = 4;
const NOTE_SHAPE = new Float32Array([0, 0.8, 1, 0.3, 0].map(v => v * 0.05));
const AudioContext = (window.AudioContext || window.webkitAudioContext);
const audioContext = new AudioContext();

let audioId;
let audioNodes = [];
/*
  Structure of 'audioNodes':
  [
    {
      beatIndex:      number,
      startTime:      number,
      volumeNode:     GainNode,
      oscillatorNode: OscillatorNode
    }
  ]
*/

// Creating audio nodes (i.e.: starting audio playback) ========================

export const createAudioNodes = (
  tracks,
  notes,
  bpm,
  numBeats
) => {
  const secondsPerBeat = (1 / (bpm * 4)) * 60;
  const secondsPerLoop = secondsPerBeat * numBeats;

  // Point at which to recreate audio nodes
  const audioLocation = getCurrentAudioLocation();
  const startingBeatIndex = audioLocation.beatIndex;
  const offsetTime = audioLocation.offsetTime;
  const loopStartTime = audioContext.currentTime + offsetTime - (secondsPerBeat * startingBeatIndex);

  // Purge existing audio nodes
  resetAudioNodes();

  // Build audio nodes
  const numTracks = tracks.length;
  for (let i = 0; i < NUM_LOOPS_TO_QUEUE; i++) {
    for (let j = 0; j < numTracks; j++) {
      for (let k = 0; k < numBeats; k++) {
        if (i === 0 && k < startingBeatIndex) {
          continue;
        }
        const audioNode = buildAudioNode(
          i,
          k,
          notes[j][k],
          tracks[j],
          loopStartTime,
          secondsPerBeat,
          secondsPerLoop
        );
        audioNodes.push(audioNode);
      }
    }
  }

  // Create an ID unique to this update
  const localAudioId = generateId();
  audioId = localAudioId;

  // Repeat
  const waitTime = (audioNodes.length / numTracks * secondsPerBeat + offsetTime) * 1000;
  setTimeout(() => {
    if (audioId === localAudioId) {
      createAudioNodes(
        tracks, 
        notes,
        bpm,
        numBeats 
      );
    }
  }, waitTime);
};

// Resetting audio nodes (i.e.: stopping audio playback) =======================

export const resetAudioNodes = () => {
  disconnectFutureNodes();
  audioNodes = [];
  audioId = null;
};

// Helper functions ============================================================

const generateId = () => Date.now();

const isValidPositveNumber = (number) => {
  return (
    typeof number === 'number' &&
    !isNaN(number) &&
    number > 0
  );
}

const buildAudioNode = (
  loopIndex,
  beatIndex,
  note,
  track,
  loopStartTime,
  secondsPerBeat,
  secondsPerLoop
) => {
  const freq = NOTE_MAP[note];
  const isTrackMuted = track.isMuted;
  const isNoteMuted = track.disabledBeats.includes(beatIndex);
  const isActive = !(isTrackMuted || isNoteMuted);
  const duration = track.noteDuration / 1000;
  const startTime = loopStartTime + (loopIndex * secondsPerLoop) + (beatIndex * secondsPerBeat);
  const isValid = isValidPositveNumber(freq) && isValidPositveNumber(duration);
  let volumeNode = null;
  let oscillatorNode = null;
  if (isActive && isValid) {
    volumeNode = audioContext.createGain();
    volumeNode.connect(audioContext.destination);
    volumeNode.gain.setValueCurveAtTime(NOTE_SHAPE, startTime, duration);
    oscillatorNode = audioContext.createOscillator();
    oscillatorNode.connect(volumeNode);
    oscillatorNode.frequency.setValueAtTime(freq, 0);
    oscillatorNode.start(startTime);
    oscillatorNode.stop(startTime + duration);
  }
  return {
    beatIndex,
    startTime,
    volumeNode,
    oscillatorNode
  };
};

const getCurrentAudioLocation = () => {
  const { currentTime } = audioContext;
  for (const audioNode of audioNodes) {
    const { startTime, beatIndex } = audioNode;
    if (startTime > currentTime) {
      const offsetTime = startTime - currentTime;
      return { beatIndex, offsetTime };
    }
  }
  return { beatIndex: 0, offsetTime: 0 };
};

const disconnectFutureNodes = () => {
  const { currentTime } = audioContext;
  for (const audioNode of audioNodes) {
    const { startTime, volumeNode } = audioNode;
    if (startTime > currentTime) {
      if (volumeNode) {
        volumeNode.disconnect();
      }
    }
  }
};
