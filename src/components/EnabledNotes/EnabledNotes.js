import { OPACITY_1 } from '../../constants/colors';
import styles from './EnabledNotes.module.css';

const EnabledNotes = ({ numBeats, track, setTrack }) => {

  if (!track) {
    return null;
  }

  const { color } = track;
  const buttonStyle = {
    backgroundColor: color + OPACITY_1,
    borderColor: color
  };

  const buttons = [];
  for (let i = 0; i < numBeats; i++) {

    const onClick = () => {
      let wasEnabled = true;
      for (let j = 0; j < track.disabledBeats.length; j++) {
        if (i === track.disabledBeats[j]) {
          track.disabledBeats.splice(j, 1);
          wasEnabled = false;
        }
      }
      if (wasEnabled) {
        track.disabledBeats.push(i);
      }
      setTrack({ ...track });
    };

    const buttonClasses = [styles.button];
    if (track.disabledBeats.includes(i)) {
      buttonClasses.push(styles.disabled);
    }

    buttons.push(
      <div
        key={i}
        onClick={onClick}
        style={buttonStyle}
        className={buttonClasses.join(' ')}
      />
    );
  }

  const buttonsClasses = [styles.buttons];
  if (track.isMuted) {
    buttonsClasses.push(styles.muted);
  }

  return (
    <div className={buttonsClasses.join(' ')}>
      {buttons}
    </div>
  )
};

export default EnabledNotes;