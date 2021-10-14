import { useRef, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { GRAY_1, OPACITY_1 } from '../../constants/colors';
import { downloadMidi } from '../../util/midiWriter';
import { shareUrl } from '../../util/sharer';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import styles from './More.module.css';

const More = ({ saveData, notes }) => {

  const moreRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const onClickMore = () => setIsVisible(!isVisible);

  const options = [
    {
      onClick: () => shareUrl(saveData),
      label: 'Share'
    },
    {
      onClick: () => downloadMidi({ ...saveData, notes }),
      label: 'Export to MIDI'
    }
  ];

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

      <DropdownMenu
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        options={options}
        containerRef={moreRef}
      />
    </div>
  );
};

export default More;