import styles from './Play.module.css';

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
      <div className={styles.playText}>{text}</div>
    </div>
  );
};


export default Play;