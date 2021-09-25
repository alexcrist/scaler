import styles from './Notes.module.css';

const Notes = ({ enabledNotes, setEnabledNotes, periodDuration, isPlaying }) => {

  const timeArmStyle = isPlaying ? 
    { animationDuration: `${periodDuration}ms` } : 
    { animation: 'none' };

  const toggleNote = (index) => {
    const newEnabledNotes = [];
    for (let i = 0; i < enabledNotes.length; i++) {
      const oldNote = enabledNotes[i];
      const newNote = i === index ? !oldNote : oldNote;
      newEnabledNotes.push(newNote);
    }
    setEnabledNotes(newEnabledNotes);
  };

  return (
    <div className={styles.notes}>
      {enabledNotes.map((isEnabled, i) => 
        <div
          onClick={() => toggleNote(i)}
          className={`${styles.note} ${isEnabled ? styles.enabled : ''}`} 
        />
      )}
      <div
        className={styles.timeArm}
        style={timeArmStyle} 
      />
    </div>
  );
};

export default Notes;