import { FaSave } from 'react-icons/fa';
import { GRAY_1, OPACITY_1 } from '../../constants/colors';
import styles from './Save.module.css';

const Save = ({ onSave }) => {
  return (
    <div 
      onClick={onSave}
      className={styles.save}
      style={{
        borderColor: GRAY_1,
        backgroundColor: GRAY_1 + OPACITY_1,
      }}
    >
      <div className={styles.saveIcon}>
        <FaSave />
      </div>
    </div>
  );
};

export default Save;