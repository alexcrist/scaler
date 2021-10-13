import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './TimelineArm.module.css';

const playAnimation = (ref, duration) => {
  gsap.fromTo(ref, {
    left: 0,
    opacity: 1
  }, {
    opacity: 1,
    left: '100%',
    ease: 'linear',
    repeat: -1,
    duration
  });
};

const pauseAnimation = (ref, duration) => {
  gsap.fromTo(ref, {
    left: 0,
    opacity: 0
  }, {
    left: 0,
    opacity: 0,
    ease: 'linear',
    repeat: -1,
    duration
  });
};

const TimelineArm = ({
  isPlaying,
  numBeats,
  bpm,
}) => {
  const armRef = useRef(null);

  useEffect(() => {
    // Multiply BPM times four to represent quarter notes
    const periodDuration = numBeats / (bpm * 4) * 60;
    if (isPlaying) {
      playAnimation(armRef.current, periodDuration);
    } else {
      pauseAnimation(armRef.current, periodDuration);
    }
  }, [isPlaying, numBeats, bpm]);

  return (
    <div
      ref={armRef}
      className={styles.arm}
    ></div>
  );
};

export default TimelineArm;