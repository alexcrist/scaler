import _ from 'lodash';
import { useState, useEffect, useRef, useMemo } from 'react';
import { calculateNotes } from '../../util/noteCalculator';
import { SCALES } from '../../constants/scales';
import { playScale } from '../../util/scalePlayer';
import getInitialData from '../../util/getInitialData';
import styles from './App.module.css';
import Chart from '../Chart/Chart.js';
import TrackOptions from '../TrackOptions/TrackOptions.js';
import LoopOptions from '../LoopOptions/LoopOptions';
import Title from '../Title/Title';
import TimelineArm from '../TimelineArm/TimelineArm';
import EnabledNotes from '../EnabledNotes/EnabledNotes';
import AddTrack from '../AddTrack/AddTrack';
import Play from '../Play/Play';
import { saveLocal } from '../../util/saveLocal';
import Save from '../Save/Save';
import { toHash } from '../../util/hasher';

const App = () => {

  const [tracks, setTracks] = useState([]);
  const [bpm, setBpm] = useState(60);
  const [numBeats, setNumBeats] = useState(16);
  const [noteRange, setNoteRange] = useState(14);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scale, setScale] = useState(SCALES[3]);
  const [lowNote, setLowNote] = useState('E3');

  // Calculate notes to play ===================================================

  const notes = useMemo(() => {
    return calculateNotes(
      tracks,
      numBeats,
      noteRange,
      scale,
      lowNote
    );
  }, [tracks, numBeats, noteRange, scale, lowNote]);

  // Ref for scale player data =================================================

  const scalePlayerData = useRef({
    tracks,
    bpm,
    notes,
    numBeats,
    isPlaying
  });
  useEffect(() => {
    scalePlayerData.current = {
      tracks,
      bpm,
      notes,
      numBeats,
      isPlaying,
    };
  }, [tracks, bpm, notes, numBeats, isPlaying]);

  // On page load ==============================================================

  useEffect(() => {
    const {
      tracks,
      bpm,
      numBeats,
      noteRange,
      scale,
      lowNote
    } = getInitialData();
    setTracks(tracks);
    setBpm(bpm);
    setNumBeats(numBeats);
    setNoteRange(noteRange);
    setScale(scale);
    setLowNote(lowNote);
  }, []);

  // Play and pause scale player ===============================================

  useEffect(() => {
    if (isPlaying) {
      playScale(scalePlayerData);
    }
  }, [isPlaying]);

  // Save to local storage =====================================================

  useEffect(() => {
    window.history.pushState({}, '', window.location.origin);
    saveLocal({ bpm, numBeats, noteRange, scale, lowNote, tracks });
  }, [bpm, numBeats, noteRange, scale, lowNote, tracks]);

  // Page content ==============================================================

  const onSave = async () => {
    const hash = toHash({ bpm, numBeats, noteRange, scale, lowNote, tracks });
    const url = window.location.origin + '?d=' + hash;

    try {
      await navigator.clipboard.writeText(url);
      alert('A link to your work has been copied to your clipboard.');
    } catch (e) {
      prompt('Save the following URL to access your work:', url);
    }
  };

  const createSetTrack = (index) => (track) => {
    const newTracks = _.cloneDeep(tracks);
    newTracks[index] = track;
    setTracks(newTracks);
  };

  return (
    <div className={styles.app}>
      <div>
        <Title />
        <div className={styles.row}>
          <div className={styles.left}>
            <div className={styles.chart}>
              <Chart
                tracks={tracks}
                numBeats={numBeats}
                notes={notes}
              />
              <TimelineArm
                isPlaying={isPlaying}
                bpm={bpm}
                numBeats={numBeats}
              />
            </div>
            {tracks.map((track, index) => (
              <EnabledNotes
                key={index}
                numBeats={numBeats}
                track={track}
                setTrack={createSetTrack(index)}
              />
            ))}

          </div>

          <div className={styles.right}>
            <div className={styles.buttons}>
              <Play
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
              <AddTrack
                tracks={tracks}
                setTracks={setTracks}
              />
              <Save onSave={onSave} />
            </div>
            {tracks.map((track, index) => (
              <TrackOptions
                key={index}
                index={index}
                track={track}
                tracks={tracks}
                setTrack={createSetTrack(index)}
                setTracks={setTracks}
              />
            ))}
          </div>
        </div>
      </div>
      <LoopOptions
        scale={scale}
        lowNote={lowNote}
        bpm={bpm}
        numBeats={numBeats}
        noteRange={noteRange}
        setScale={setScale}
        setLowNote={setLowNote}
        setBpm={setBpm}
        setNumBeats={setNumBeats}
        setNoteRange={setNoteRange}
      />
    </div>
  )
}

export default App;