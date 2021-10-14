import { useState, useRef } from 'react';
import { FaFolder } from 'react-icons/fa';
import { GRAY_1, OPACITY_1 } from '../../constants/colors';
import { loadLocalSaves } from '../../util/storageManager';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import styles from './Load.module.css';

const Load = ({
  setBpm,
  setNumBeats,
  setNoteRange,
  setScale,
  setLowNote,
  setTracks
}) => {

  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [options, setOptions] = useState([]);

  const onClickLoad = () => {
    setIsVisible(!isVisible);
    const saves = loadLocalSaves();
    let newOptions = saves.map((save) => ({
      label: save.name,
      onClick: () => {
        const {
          bpm,
          numBeats,
          noteRange,
          scale,
          lowNote,
          tracks
        } = save.data;
        setBpm(bpm);
        setNumBeats(numBeats);
        setNoteRange(noteRange);
        setScale(scale);
        setLowNote(lowNote);
        setTracks(tracks);
      }
    }));

    if (newOptions.length === 0) {
      newOptions = [{
        label: 'No saves',
        onClick: () => {},
      }]
    }

    setOptions(newOptions);
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
    >
      <div 
        title='Load'
        onClick={onClickLoad}
        className={styles.load}
        style={{
          borderColor: GRAY_1,
          backgroundColor: GRAY_1 + OPACITY_1,
        }}
      >
        <div className={styles.icon}>
          <FaFolder />
        </div>
      </div>

      <DropdownMenu
        containerRef={containerRef}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        options={options}
      />
    </div>
  )
};

export default Load;