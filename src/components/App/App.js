import _ from 'lodash';
import { useState, useEffect, useRef, useMemo } from 'react';
import getInitialTracks from '../../util/getInitialTracks';
import styles from './App.module.css';
import Chart from '../Chart/Chart.js';
import TrackOptions from '../TrackOptions/TrackOptions.js';
import { GRAY_1, OPACITY_3 } from '../../constants/colors';
import LoopOptions from '../LoopOptions/LoopOptions';
import Header from '../Header/Header';
import TimelineArm from '../TimelineArm/TimelineArm';
import { calculateNotes } from '../../util/noteCalculator';
import { SCALES } from '../../constants/scales';
import { playScale, stopScale } from '../../util/scalePlayer';

const scale = SCALES[2];
const lowNote = 'D3';

const App = () => {

  const [trackIndex, setTrackIndex] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [bpm, setBpm] = useState(120);
  const [numBeats, setNumBeats] = useState(8);
  const [noteRange, setNoteRange] = useState(14);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Calculate notes to play ===================================================

  const notes = useMemo(() => {
    return calculateNotes(
      tracks,
      numBeats,
      noteRange,
      scale,
      lowNote
    );
  }, [tracks, numBeats, noteRange]);

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

  useEffect(() => { setTracks(getInitialTracks()); }, []);

  // Play and pause scale player ===============================================

  useEffect(() => {
    if (isPlaying) {
      playScale(scalePlayerData);
    }
  }, [isPlaying]);

  // Page content ==============================================================

  const createSetTrack = (index) => (track) => {
    const newTracks = _.cloneDeep(tracks);
    newTracks[index] = track;
    setTracks(newTracks);
  };

  return (
    <div className={styles.app}>

      <Header />

      <div className={styles.row}>

        <div className={styles.loopOptions}>
          <LoopOptions
            isPlaying={isPlaying}
            bpm={bpm}
            numBeats={numBeats}
            noteRange={noteRange}
            setIsPlaying={setIsPlaying}
            setBpm={setBpm}
            setNumBeats={setNumBeats}
            setNoteRange={setNoteRange}
          />
        </div>

        <div className={styles.chart}>
          <Chart
            tracks={tracks}
            trackIndex={trackIndex}
            numBeats={numBeats}
            notes={notes}
          />
          <TimelineArm
            isPlaying={isPlaying}
            bpm={bpm}
            numBeats={numBeats}  
          />
        </div>

        <div className={styles.trackOptions}>
          {tracks.map((track, index) => (
            <TrackOptions
              key={index}
              index={index}
              track={track}
              isSelected={trackIndex === index}
              setTrack={createSetTrack(index)}
              setTrackIndex={setTrackIndex}
            />
          ))}
          <div
            className={styles.createTrack}
            style={{
              borderColor: GRAY_1,
              backgroundColor: GRAY_1 + OPACITY_3,
            }}
          >
            Add track
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;