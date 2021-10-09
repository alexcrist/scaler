import { COLORS, GRAY_1, OPACITY_1 } from '../../constants/colors';
import styles from './AddTrack.module.css';

const AddTrack = ({ tracks, setTracks }) => {

  const addTrack = () => {
    const lastColor = tracks[tracks.length - 1].color;
    const lastColorIndex = COLORS.indexOf(lastColor);
    const newColorIndex = (lastColorIndex + 1) % COLORS.length;
    const newColor = COLORS[newColorIndex];
    const newTrack = {
      color: newColor,
      formula: 'y = 0',
      noteDuration: 100,
      disabledBeats: [],
      isMuted: false
    };
    setTracks([...tracks, newTrack]);
  };

  return (
    <div
      onClick={addTrack}
      className={styles.createTrack}
      style={{
        borderColor: GRAY_1,
        backgroundColor: GRAY_1 + OPACITY_1,
      }}
    >
      <div className={styles.createTrackText}>
        Add track
      </div>
    </div>
  );
};

export default AddTrack;