import { update } from 'lodash';
import { GRAY_1, OPACITY_1 } from '../../constants/colors';
import { MODES, PITCHES, SCALES } from '../../constants/scales';
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

const ScaleSelect = ({ scale, setScale, lowNote, setLowNote }) => {

  const [pitch, ...modeArray] = scale.name.split(' ');
  const mode = modeArray.join(' ');
  const modeNames = MODES.map((m) => m.name);

  const pitchIndex = PITCHES.indexOf(pitch);
  const modeIndex = modeNames.indexOf(mode);

  const updateScale = (newPitch, newMode) => {
    const scaleName = `${newPitch} ${newMode}`;
    const newScale = SCALES.filter((s) => s.name === scaleName)[0];
    console.log(scaleName);
    const lowNoteIndex = scale.notes.indexOf(lowNote);
    const newLowNote = newScale.notes[lowNoteIndex];
    setLowNote(newLowNote);
    setScale(newScale);
  }

  const onChangePitch = (e) => updateScale(PITCHES[e.target.value], mode);

  const onChangeMode = (e) => updateScale(pitch, modeNames[e.target.value]);

  return (
    <div className={`${styles.inputGroup} ${styles.scaleInputGroup}`}>
      <label className={styles.label}>
        Scale
      </label>
      <div className={styles.scaleSelects}>
        <select
          style={{ borderColor: GRAY_1 }}
          className={styles.input}
          onChange={onChangePitch}
          value={pitchIndex}
        >
          {PITCHES.map((pitch, index) => (
            <option
              key={index}
              value={index}
            >
              {pitch}
            </option>
          ))}
        </select>
        <select
          style={{ borderColor: GRAY_1 }}
          className={styles.input}
          onChange={onChangeMode}
          value={modeIndex}
        >
          {modeNames.map((modeName, index) => (
            <option
              key={index}
              value={index}
            >
              {modeName}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
};

const LowNoteSelect = ({ scale, lowNote, setLowNote }) => {

  const selectedIndex = scale.notes.indexOf(lowNote);

  const onChange = (e) => {
    const newNote = scale.notes[e.target.value];
    setLowNote(newNote);
  };

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>
        Low note
      </label>
      <select
        style={{ borderColor: GRAY_1 }}
        className={styles.input}
        onChange={onChange}
        value={selectedIndex}
      >
        {scale.notes.map((note, index) => (
          <option
            key={index}
            value={index}
          >
            {note}
          </option>
        ))}
      </select>
    </div>
  )
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

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: GRAY_1 + OPACITY_1, borderColor: GRAY_1 }}
    >
      <Input
        label='Tempo (bpm)'
        type='number'
        value={bpm}
        onChange={(e) => setBpm(Math.min(Number(e.target.value), 999))}
      />
      <Input
        label='Beats per measure'
        type='number'
        value={numBeats}
        onChange={(e) => setNumBeats(Math.min(Number(e.target.value), 99))}
      />
      <Input
        label='Pitch range'
        type='number'
        value={noteRange}
        onChange={(e) => setNoteRange(Math.min(Number(e.target.value), 99))}
      />
      <LowNoteSelect
        scale={scale}
        lowNote={lowNote}
        setLowNote={setLowNote}
      />
      <ScaleSelect
        lowNote={lowNote}
        setLowNote={setLowNote}
        scale={scale}
        setScale={setScale}
      />
    </div>
  );
};

export default LoopOptions;