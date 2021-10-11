import { useEffect, useRef, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { GRAY_1, OPACITY_1 } from '../../constants/colors';
import { downloadFile } from '../../util/fileDownloader';
import { toMidiString } from '../../util/midiWriter';
import styles from './More.module.css';

const ExportToMidi = ({
  setIsVisible,
  bpm,
  tracks,
  notes,
}) => {
  const onClickExportToMidi = () => {
    setIsVisible(false);
    const midiString = toMidiString({ bpm, tracks, notes });
    downloadFile('scaler.mid', midiString);
  };
  return (
    <div
      onClick={onClickExportToMidi}
      className={styles.option}
    >
      Export to MIDI
    </div>
  );
};

const OverflowMenu = ({
  isVisible,
  setIsVisible,
  bpm,
  tracks,
  notes
}) => {

  const classes = [styles.overflowMenu];
  if (!isVisible) {
    classes.push(styles.hidden);
  }

  return (
    <div className={classes.join(' ')}>
      <ExportToMidi
        setIsVisible={setIsVisible}
        bpm={bpm}
        tracks={tracks}
        notes={notes}
      />
    </div>
  );
};

const More = (props) => {

  const [isVisible, setIsVisible] = useState(false);

  const onClickMore = () => {
    setIsVisible(!isVisible);
  };

  // Close menu when user clicks somewhere else
  const moreRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousdown', handleClickOutside);
    };
  }, [moreRef]);

  return (
    <div
      ref={moreRef} 
      className={styles.moreContainer}
    >
      <div
        title='More'
        onClick={onClickMore}
        className={styles.more}
        style={{
          borderColor: GRAY_1,
          backgroundColor: GRAY_1 + OPACITY_1,
        }}
      >
        <div className={styles.moreIcon}>
          <FaEllipsisV />
        </div>
      </div>
      <OverflowMenu
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        {...props}
      />
    </div>
  );
};

export default More;