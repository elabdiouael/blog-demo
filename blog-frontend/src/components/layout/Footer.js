import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Ligne Decoratif lfo9 */}
      <div className={styles.scanLine}></div>

      <div className={styles.container}>
        
        {/* Partie Gauche: Copyright */}
        <div className={styles.left}>
          <h3 className={styles.brand}>WIAM<span className={styles.dot}>.</span>DEV</h3>
          <p className={styles.copy}>
            &copy; 2026. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Partie Droite: Status & Badge */}
        <div className={styles.right}>
          <div className={styles.statusBox}>
            <span className={styles.indicator}></span>
            SYSTEM ONLINE
          </div>
          <div className={styles.designBadge}>
             DESIGN <span className={styles.x2}>x2</span>
          </div>
        </div>

      </div>
      
      {/* Background Grid Effect */}
      <div className={styles.gridBg}></div>
    </footer>
  );
};

export default Footer;