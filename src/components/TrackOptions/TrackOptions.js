
import { COLORS, OPACITY_1, OPACITY_2, OPACITY_3 } from '../../constants/colors';
import styles from './TrackOptions.module.css';

const Input = ({ index, ...props }) => {
  const color = COLORS[index % COLORS.length];
  const borderColor = color;
  const style = { borderColor };
  return (
    <input
      index={index}
      className={styles.input}
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

  const {
    formula,
    lowNote,
    noteRange,
    noteDuration
  } = track;

  const createAttributeSetter = (attribute) => (e) => {
    track[attribute] = e.target.value;
    setTrack(track);
  };

  return (
    <div className={styles.editable}>

      <label className={styles.label}>Formula</label>
      <Input
        index={index}
        value={formula}
        onChange={createAttributeSetter('formula')}
      />

      <label className={styles.label}>Low note</label>
      <Input
        index={index}
        value={lowNote}
        onChange={createAttributeSetter('lowNote')}
      />

      <label className={styles.label}>Note range</label>
      <Input
        index={index}
        value={noteRange}
        onChange={createAttributeSetter('noteRange')}
        type='number'
      />

      <label className={styles.label}>Note duration (ms)</label>
      <Input
        index={index}
        value={noteDuration}
        onChange={createAttributeSetter('noteDuration')}
        type='number'
      />
    </div>
  );
};

const Options = ({
  index,
  track,
  isSelected,
  setTrack,
  setTrackIndex
}) => {

  const color = COLORS[index % COLORS.length];
  const borderColor = color;
  const backgroundColor = color + OPACITY_1;
  const containerStyle = { borderColor, backgroundColor };
  const containerClasses = [styles.container];
  if (!isSelected) {
    containerClasses.push(styles.collapsed)
  }

  const onClickContainer = () => {
    if (!isSelected) {
      setTrackIndex(index);
    }
  };

  return (
    <div
      style={containerStyle}
      className={containerClasses.join(' ')}
      onClick={onClickContainer}
    >
      <div className={styles.title}>Track {index + 1}</div>
      {isSelected
        ? <Inputs 
            track={track} 
            index={index} 
            setTrack={setTrack} 
          />
        : null
      }
    </div>
  );
};

export default Options;