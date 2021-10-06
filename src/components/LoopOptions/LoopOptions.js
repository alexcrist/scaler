import { GRAY_1, OPACITY_3 } from '../../constants/colors';
import styles from './LoopOptions.module.css';

const Play = ({ isPlaying, setIsPlaying }) => {

  const text = isPlaying ? 'Stop' : 'Play';
  const playStyle = isPlaying
    ? {
      borderColor: '#980031',
      backgroundColor: '#98003199'
    }
    : {
      borderColor: '#489900',
      backgroundColor: '#48990099'
    };


  const onPlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      onClick={onPlay}
      className={styles.play}
      style={playStyle}
    >
      <div>{text}</div>
    </div>
  );
};

const Container = ({ isPlyaing, setIsPlaying, children }) => {
  const titleStyle = { color: GRAY_1 };
  const containerStyle = { borderColor: GRAY_1 };
  return (
    <div>
      <div className={styles.containerTopPlay}>
        <div className={styles.containerTop} style={containerStyle}>
          <div
            className={styles.title}
            style={titleStyle}
          >
            Loop options
          </div>
        </div>
        <Play
          isPlaying={isPlyaing}
          setIsPlaying={setIsPlaying}
        />
      </div>
      <div
        className={styles.container}
        style={containerStyle}
      >
        <div
          className={styles.containerCorner}
          style={containerStyle}
        ></div>
        {children}
      </div>
    </div>
  );
};

const Input = (props) => {
  const labelStyle = { color: GRAY_1 };
  const inputStyle = { borderColor: GRAY_1 };
  return (
    <>
      <label
        className={styles.label}
        style={labelStyle}
      >
        {props.label}
      </label>
      <input
        className={styles.input}
        style={inputStyle}
        {...props}
      />
    </>
  );
};

const LoopOptions = ({
  isPlaying,
  bpm,
  numBeats,
  noteRange,
  setIsPlaying,
  setBpm,
  setNumBeats,
  setNoteRange
}) => {

  return (
    <Container
      isPlyaing={isPlaying}
      setIsPlaying={setIsPlaying}
    >
      <Input
        label='Tempo (bpm)'
        type='number'
        value={bpm}
        onChange={(e) => setBpm(Number(e.target.value))}
      />
      <Input
        label='Beats per measure'
        type='number'
        value={numBeats}
        onChange={(e) => setNumBeats(Number(e.target.value))}
      />
      <Input
        label='Note range'
        type='number'
        value={noteRange}
        onChange={(e) => setNoteRange(Number(e.target.value))}
      />
      <Input
        label='Low note'
        value='D3'
        onChange={() => null}
        disabled
      />
      <Input
        label='Scale'
        value='D Major'
        onChange={() => null}
        disabled
      />
    </Container>
  );
};

export default LoopOptions;