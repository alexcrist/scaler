import { useEffect, useRef, useState } from 'react';
import Chart from '../Chart/Chart';
import styles from './App.module.css';
import Notes from '../Notes/Notes';
import { playScale, stopScale } from '../../util/scalePlayer';

const initialNumNotes = 16;
const initailEnabledNotes = [];
for (let i = 0; i < initialNumNotes; i++) {
  initailEnabledNotes.push(true);
}

const App = () => {

  const [formula, setFormula] = useState('y = sin(x) + cos(4*x)');
  const [numNotes, setNumNotes] = useState(initialNumNotes);
  const [enabledNotes, setEnabledNotes] = useState(initailEnabledNotes);
  const [isPlaying, setIsPlaying] = useState(false);
  const [periodDuration, setPeriodDuration] = useState(3000);

  const enabledNotesRef = useRef(enabledNotes);
  useEffect(() => {
    enabledNotesRef.current = enabledNotes;
  }, [enabledNotes]);

  const onClickButton = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopScale();
    } else {
      setIsPlaying(true);
      playScale(formula, enabledNotesRef, periodDuration);
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
    setNumNotes(Number(e.target.value));
    if (!isNaN(Number(e.target.value))) {
      const newEnabledNotes = [];
      for (let i = 0; i < Number(e.target.value); i++) {
        newEnabledNotes.push(true);
      }
      setEnabledNotes(newEnabledNotes);
    }
  };

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
          value={numNotes}
          onChange={onChangeNumNotes}
          type='number'
        />
      </div>

      <div className={styles.labels}>
        <label>Scale</label>
        <label>Low note</label>
        <label>Note range</label>
      </div>

      <div className={styles.inputs}>
        <input
          className={styles.input}
          value='D Major'
          disabled
        />
        <input
          className={styles.input}
          value='D2'
          disabled
        />
        <input
          className={styles.input}
          value='12'
          disabled
        />
      </div>

      <Chart formulas={[formula]} />

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
