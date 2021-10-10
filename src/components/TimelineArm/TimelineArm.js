import styles from './TimelineArm.module.css';

const TimelineArm = ({ isPlaying, bpm, numBeats }) => {

  // Multiply BPM times four to represent quarter notes
  const periodDuration = Math.round(numBeats / (bpm * 4) * 60 * 1000);

  const timelineArmStyle = isPlaying 
    ? { animationDuration: `${periodDuration}ms` }
    : { animation: 'none', display: 'none' };

  return (
    <div 
      className={styles.arm}
      style={timelineArmStyle}
    ></div>
  );
};

export default TimelineArm;