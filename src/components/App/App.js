import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { SCALES } from '../../constants/scales';
import { createAudioNodes, resetAudioNodes } from '../../util/audioPlayer';
import { calculateNotes } from '../../util/noteCalculator';
import { loadInitialState } from '../../util/stateLoader';
import { storeRecent } from '../../util/storageManager';
import AddTrack from '../AddTrack/AddTrack';
import Chart from '../Chart/Chart.js';
import EnabledNotes from '../EnabledNotes/EnabledNotes';
import Header from '../Header/Header';
import Load from '../Load/Load';
import LoopOptions from '../LoopOptions/LoopOptions';
import More from '../More/More';
import Play from '../Play/Play';
import Save from '../Save/Save';
import TimelineArm from '../TimelineArm/TimelineArm';
import TrackOptions from '../TrackOptions/TrackOptions.js';
import styles from './App.module.css';

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

  // On page load ==============================================================

  useEffect(() => {
    const {
      tracks,
      bpm,
      numBeats,
      noteRange,
      scale,
      lowNote
    } = loadInitialState();
    setTracks(tracks);
    setBpm(bpm);
    setNumBeats(numBeats);
    setNoteRange(noteRange);
    setScale(scale);
    setLowNote(lowNote);
  }, []);

  // Playing and pausing audio =================================================

  useEffect(() => {
    if (isPlaying) {
      createAudioNodes(
        tracks,
        notes,
        bpm,
        numBeats
      );
    } else {
      resetAudioNodes();
    }
  }, [
    isPlaying,
    tracks,
    notes,
    bpm,
    numBeats
  ]);

  // Local storage =============================================================

  const saveData = useMemo(() => ({
    bpm,
    numBeats,
    noteRange,
    scale,
    lowNote,
    tracks
  }), [bpm, numBeats, noteRange, scale, lowNote, tracks]);

  useEffect(() => {
    window.history.pushState({}, '', window.location.origin + window.location.pathname);
    storeRecent(saveData);
  }, [saveData]);

  // Event handlers ============================================================

  const createSetTrack = (index) => (track) => {
    const newTracks = _.cloneDeep(tracks);
    newTracks[index] = track;
    setTracks(newTracks);
  };

  // Page content ==============================================================

  return (
    <div className={styles.app}>
      <div>

        <Header />

        <div className={styles.row}>

          {/* Left section ================================================= */}
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

          {/* Right section ================================================ */}
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
              <Save saveData={saveData} />
              <Load 
                setBpm={setBpm}
                setNumBeats={setNumBeats}
                setNoteRange={setNoteRange}
                setScale={setScale}
                setLowNote={setLowNote}
                setTracks={setTracks}
              />
              <More
                saveData={saveData}
                notes={notes}
              />
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