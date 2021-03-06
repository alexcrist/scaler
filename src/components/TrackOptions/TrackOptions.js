import { useState } from 'react';
import { FaTrash, FaVolumeDown, FaVolumeMute } from 'react-icons/fa';
import { OPACITY_1 } from '../../constants/colors';
import { formulaToData } from '../../util/formulaEvaluator';
import styles from './TrackOptions.module.css';

const Input = ({ color, index, isError, ...props }) => {
  const borderColor = color;
  const style = { borderColor };
  const classes = [styles.input];
  if (isError) {
    classes.push(styles.inputError);
  }
  return (
    <input
      index={index}
      className={classes.join(' ')}
      style={style}
      {...props}
    />
  );
};

const Inputs = ({
  index,
  track,
  setTrack
}) => {

  const { formula, noteDuration } = track;

  let isFormulaValid = true;
  try {
    formulaToData(formula, [0, Math.PI]);
  } catch (e) {
    isFormulaValid = false;
  }

  const createAttributeSetter = (attribute) => (e) => {
    track[attribute] = e.target.value;
    setTrack(track);
  };

  return (
    <div className={styles.editable}>

      <label className={styles.label}>Formula</label>
      <Input
        isError={!isFormulaValid}
        color={track.color}
        index={index}
        value={formula}
        onChange={createAttributeSetter('formula')}
      />

      <label className={styles.label}>Note duration (ms)</label>
      <Input
        color={track.color}
        index={index}
        value={noteDuration}
        onChange={createAttributeSetter('noteDuration')}
        type='number'
      />
    </div>
  );
};

const Icons = ({ 
  isCollapsed,
  index,
  track,
  tracks,
  setTrack,
  setTracks,
}) => {
  if (isCollapsed) {
    return null;
  }

  const onMute = () => {
    setTrack({
      ...track,
      isMuted: !track.isMuted
    });
  };

  const onDelete = () => {
    if (tracks.length === 1) {
      return;
    }
    tracks.splice(index, 1);
    setTracks([...tracks]);
  };

  const muteClasses = [styles.icon];
  if (track.isMuted) {
    muteClasses.push(styles.isMuted);
  }

  const MuteIcon = track.isMuted ? FaVolumeMute : FaVolumeDown;

  return (
    <div className={styles.icons}>
      <div
        title='Mute'
        onClick={onMute}
        className={muteClasses.join(' ')}
      >
        <MuteIcon className={styles.muteIcon} />
      </div>
      <div
        title='Delete'
        onClick={onDelete}
        className={styles.icon}
      >
        <FaTrash className={styles.trashIcon} />
      </div>
    </div>
  );
};

const TrackOptions = ({
  index,
  track,
  tracks,
  setTracks,
  setTrack
}) => {

  const [isCollapsed, setIsCollapsed] = useState(index !== 0);

  const color = track.color;
  const borderColor = color;
  const backgroundColor = color + OPACITY_1;
  const containerStyle = { borderColor, backgroundColor };
  const containerClasses = [styles.container];
  if (isCollapsed) {
    containerClasses.push(styles.collapsed)
  }

  const onClickContainer = (e) => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      style={containerStyle}
      className={containerClasses.join(' ')}
    >
      <div className={styles.header}>
        <div
          onClick={onClickContainer} 
          className={styles.title}
        >
          Track {index + 1}
        </div>
        <Icons
          index={index}
          isCollapsed={isCollapsed}
          track={track}
          tracks={tracks}
          setTrack={setTrack}
          setTracks={setTracks}
        />
      </div>
      {isCollapsed
        ? null
        : <Inputs
            track={track} 
            index={index} 
            setTrack={setTrack} 
          />
      }
    </div>
  );
};

export default TrackOptions;