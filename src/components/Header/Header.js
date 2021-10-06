import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        SCALER
      </div>
      <a 
        className={styles.link} 
        href='https://github.com/alexcrist/scaler'
        target='_'  
      >
        the code
      </a>
    </div>
  );
};

export default Header;