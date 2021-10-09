import { GRAY_1, OPACITY_1 } from '../../constants/colors';
import styles from './LoopOptions.module.css';

const Input = (props) => {
  const inputStyle = { borderColor: GRAY_1 };
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>
        {props.label}
      </label>
      <input
        className={styles.input}
        style={inputStyle}
        {...props}
      />
    </div>
  );
};

const LoopOptions = ({
  bpm,
  numBeats,
  noteRange,
  setBpm,
  setNumBeats,
  setNoteRange
}) => {

  const containerStyle = {
    backgroundColor: GRAY_1 + OPACITY_1,
    borderColor: GRAY_1,
  };

  return (
    <div
      className={styles.container}
      style={containerStyle}
    >
      <Input
        label='Tempo (bpm)'
        type='number'
        value={bpm}
        onChange={(e) => setBpm(Number(e.target.value))}
      />
      <Input
        label='Beats per measure'
        type='number'
        value={numBeats}
        onChange={(e) => setNumBeats(Number(e.target.value))}
      />
      <Input
        label='Note range'
        type='number'
        value={noteRange}
        onChange={(e) => setNoteRange(Number(e.target.value))}
      />
      <Input
        label='Low note'
        value='D3'
        onChange={() => null}
        disabled
      />
      <Input
        label='Scale'
        value='D Major'
        onChange={() => null}
        disabled
      />
    </div>
  );
};

export default LoopOptions;