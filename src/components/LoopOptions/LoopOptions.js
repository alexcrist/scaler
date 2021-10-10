import { GRAY_1, OPACITY_1 } from '../../constants/colors';
import { SCALES } from '../../constants/scales';
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

const Select = ({ options, label, display, onChange, initialValue }) => {
  const inputStyle = { borderColor: GRAY_1 };
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>
        {label}
      </label>
      <select
        style={inputStyle}
        className={styles.input}
        onChange={onChange}
      >
        {options.map((option, i) => (
          <option
            value={i}
            key={i}
            selected={JSON.stringify(option) === JSON.stringify(initialValue)}
          >
            {display(options, i)}
          </option>
        ))}
      </select>
    </div>
  );
};

const LoopOptions = ({
  scale,
  lowNote,
  bpm,
  numBeats,
  noteRange,
  setScale,
  setLowNote,
  setBpm,
  setNumBeats,
  setNoteRange
}) => {

  const containerStyle = {
    backgroundColor: GRAY_1 + OPACITY_1,
    borderColor: GRAY_1,
  };

  const selectableNotes = scale.notes.filter((note) => {
    const number = note[note.length - 1];
    return (number >= 2 && number <= 6); 
  });

  const onChangeLowNote = (e) => {
    const noteIndex = e.target.value;
    setLowNote(selectableNotes[noteIndex]);
  };

  const onChangeScale = (e) => {
    const scaleIndex = e.target.value;
    const newScale = SCALES[scaleIndex];
    const oldLowNoteIndex = scale.notes.indexOf(lowNote);
    const newLowNote = newScale.notes[oldLowNoteIndex];
    setScale(newScale);
    setLowNote(newLowNote);
  }

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
        label='Pitch range'
        type='number'
        value={noteRange}
        onChange={(e) => setNoteRange(Number(e.target.value))}
      />
      <Select
        label='Low note'
        onChange={onChangeLowNote}
        initialValue={lowNote}
        options={selectableNotes}
        display={(options, i) => options[i]}
      />
      <Select
        label='Scale'
        onChange={onChangeScale}
        initialValue={scale}
        options={SCALES}
        display={(options, i) => options[i].name}
      />
    </div>
  );
};

export default LoopOptions;