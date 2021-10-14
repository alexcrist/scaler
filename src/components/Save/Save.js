import { FaSave } from 'react-icons/fa';
import { GRAY_1, OPACITY_1 } from '../../constants/colors';
import { saveLocal } from '../../util/storageManager';
import styles from './Save.module.css';

const Save = ({ saveData }) => {

  const onSave = () => {
    saveLocal(saveData);
  };

  return (
    <div
      title='Save'
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
