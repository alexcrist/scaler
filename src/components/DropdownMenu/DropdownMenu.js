import { useEffect } from 'react/cjs/react.development';
import styles from './DropdownMenu.module.css';

const DropdownMenu = ({
  containerRef,
  isVisible,
  setIsVisible, 
  options 
}) => {

  // Close menu when user clicks somewhere else
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef, setIsVisible]);

  const dropdownClasses = [styles.dropdown];
  if (!isVisible) {
    dropdownClasses.push(styles.hidden);
  }

  const onClickOption = (option) => () => {
    setIsVisible(false);
    option.onClick();
  };

  return (
    <div className={dropdownClasses.join(' ')}>
      {options.map((option, index) => (
        <div
          key={index} 
          className={styles.option}
          onClick={onClickOption(option)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;