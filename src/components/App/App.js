import _ from 'lodash';
import { useState, useEffect } from 'react';
import getInitialTracks from '../../util/getInitialTracks';
import styles from './App.module.css';
import Chart from '../Chart/Chart.js';
import TrackOptions from '../TrackOptions/TrackOptions.js';
import { GRAY_1, OPACITY_1, OPACITY_3 } from '../../constants/colors';

const App = () => {

  const [trackIndex, setTrackIndex] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [numBeats, setNumBeats] = useState(3);
  
  useEffect(() => { setTracks(getInitialTracks()); }, []);

  const createSetTrack = (index) => (track) => {
    const newTracks = _.cloneDeep(tracks);
    newTracks[index] = track;
    setTracks(newTracks);
  };

  return (
    <div className={styles.app}>

      <div className={styles.left}></div>

      <div className={styles.chart}>
        <Chart
          tracks={tracks}
          trackIndex={trackIndex}
          setTracks={setTracks}
          numBeats={numBeats}
        />
      </div>

      <div className={styles.options}>
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
  )
}

export default App;