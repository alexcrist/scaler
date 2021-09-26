import { useEffect, useRef, useState } from 'react';
import Chart from '../Chart/Chart';
import styles from './App.module.css';
import Notes from '../Notes/Notes';
import { playScale, stopScale } from '../../util/scalePlayer';
import { SCALES } from '../../constants/scales';
import { calculateNotes } from '../../util/noteCalculator';

const initialNumNotes = 16;
const initailEnabledNotes = [];
for (let i = 0; i < initialNumNotes; i++) {
  initailEnabledNotes.push(true);
}

const App = () => {

  // State =====================================================================

  const [formula, setFormula] = useState('y = sin(x) + cos(4*x)');
  const [enabledNotes, setEnabledNotes] = useState(initailEnabledNotes);
  const [isPlaying, setIsPlaying] = useState(false);
  const [periodDuration, setPeriodDuration] = useState(3000);
  const [scale, setScale] = useState(SCALES[0]);
  const [lowNote, setLowNote] = useState(SCALES[0].notes[7 * 3]);
  const [noteRange, setNoteRange] = useState(14);
  const [noteDuration, setNoteDuration] = useState(85);

  // Refs ======================================================================

  const enabledNotesRef = useRef(enabledNotes);
  const noteDurationRef = useRef(noteDuration);
  useEffect(() => { enabledNotesRef.current = enabledNotes; }, [enabledNotes]);
  useEffect(() => { noteDurationRef.current = noteDuration; }, [noteDuration]);
  
  // Notes to play =============================================================

  const numNotes = enabledNotes.length;
  const notes = calculateNotes(
    scale, 
    numNotes, 
    formula, 
    lowNote, 
    noteRange
  );

  // Event handlers ============================================================

  const onClickButton = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopScale();
    } else {
      setIsPlaying(true);
      playScale(notes, enabledNotesRef, periodDuration, noteDurationRef);
    }
  };

  const onChangeFormula = (e) => {
    setIsPlaying(false);
    stopScale();
    setFormula(e.target.value);
  };

  const onChangePeriod = (e) => {
    setIsPlaying(false);
    stopScale();
    setPeriodDuration(Number(e.target.value));
  };

  const onChangeNumNotes = (e) => {
    setIsPlaying(false);
    stopScale();
    if (!isNaN(Number(e.target.value))) {
      const newEnabledNotes = [];
      for (let i = 0; i < Number(e.target.value); i++) {
        newEnabledNotes.push(true);
      }
      setEnabledNotes(newEnabledNotes);
    }
  };

  const onChangeScale = (e) => {
    setIsPlaying(false);
    stopScale();
    const newScale = SCALES[e.target.value];
    setScale(newScale);
    setLowNote(newScale.pitches[0] + '3');
  };

  const onChangeLowNote = (e) => {
    setIsPlaying(false);
    stopScale();
    setLowNote(e.target.value);
  };

  const onChangeNoteRange = (e) => {
    setIsPlaying(false);
    stopScale();
    if (!isNaN(Number(e.target.value))) {
      setNoteRange(Number(e.target.value));
    }
  }

  const onChangeNoteDuration = (e) => {
    if (!isNaN(Number(e.target.value))) {
      setNoteDuration(Number(e.target.value));
    }
  };

  // Content ===================================================================

  return (
    <div className={styles.container}>

      <div className={styles.labels}>
        <label>Formula</label>
        <label>Period (ms)</label>
        <label>Beats</label>
      </div>

      <div className={styles.inputs}>
        <input
          className={styles.input}
          value={formula}
          onChange={onChangeFormula}
        />
        <input
          className={styles.input}
          value={periodDuration}
          onChange={onChangePeriod}
          type='number'
        />
        <input
          className={styles.input}
          value={enabledNotes.length}
          onChange={onChangeNumNotes}
          type='number'
        />
      </div>

      <div className={styles.labels}>
        <label>Scale</label>
        <label>Low note</label>
        <label>Note range</label>
        <label>Note duration (ms)</label>
      </div>

      <div className={styles.inputs}>
        <select className={styles.input} onChange={onChangeScale}>
          {SCALES.map((scale, i) => <option value={i} key={i}>{scale.name}</option>)}
        </select>
        <select className={styles.input} value={lowNote} onChange={onChangeLowNote}>
          {scale.notes.map((note, i) => <option value={note} key={i}>{note}</option>)}
        </select>
        <input
          className={styles.input}
          value={noteRange}
          onChange={onChangeNoteRange}
          type='number'
        />
        <input
          className={styles.input}
          value={noteDuration}
          onChange={onChangeNoteDuration}
          type='number'
        />
      </div>

      <Chart
        formulas={[formula]}
        numNotes={enabledNotes.length}
        noteRange={noteRange}
        notes={notes}
      />

      <Notes
        enabledNotes={enabledNotes}
        setEnabledNotes={setEnabledNotes}
        isPlaying={isPlaying}
        periodDuration={periodDuration}
      />

      <button className={styles.play} onClick={onClickButton}>
        {isPlaying ? 'stop' : 'start'}
      </button>

    </div>
  );
}

export default App;
