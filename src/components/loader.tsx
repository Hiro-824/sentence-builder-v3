"use client"

import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.dotsContainer}>
        <div className={`${styles.dot} ${styles.dot1}`}></div>
        <div className={`${styles.dot} ${styles.dot2}`}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
};

export default Loader;