import styles from './Title.module.css';

const Title = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        SCALER
      </div>
      <div className={styles.line} />
      <a 
        className={styles.link} 
        href='https://github.com/alexcrist/scaler'
        target='_'  
      >
        see the code
      </a>
    </div>
  );
};

export default Title;