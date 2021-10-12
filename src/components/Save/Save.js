import { FaSave } from 'react-icons/fa';
import { GRAY_1, OPACITY_1 } from '../../constants/colors';
import { toHash } from '../../util/stateHasher';
import styles from './Save.module.css';

const Save = ({
  bpm,
  numBeats,
  noteRange,
  scale,
  lowNote,
  tracks
}) => {

  const onSave = async () => {
    const hash = toHash({ bpm, numBeats, noteRange, scale, lowNote, tracks });
    const url = window.location.origin + window.location.pathname + '?d=' + hash;
    try {
      await navigator.clipboard.writeText(url);
      alert('A link to your work has been copied to your clipboard.');
    } catch (e) {
      prompt('Save the following URL to access your work:', url);
    }
  };

  return (
    <div
      title='Save'
      onClick={onSave}
      className={styles.save}
      style={{
        borderColor: GRAY_1,
        backgroundColor: GRAY_1 + OPACITY_1,
      }}
    >
      <div className={styles.saveIcon}>
        <FaSave />
      </div>
    </div>
  );
};

export default Save;