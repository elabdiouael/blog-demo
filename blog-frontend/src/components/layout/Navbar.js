'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  const pathname = usePathname();

  // Fonction bach n-checkiw l'active link
  const isActive = (path) => pathname === path;

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ARCHITECTURE', path: '/architecture' },
    { name: 'ABOUT', path: '/about' },
  ];

  return (
    <div className={styles.wrapper}>
      <nav className={styles.navbar}>
        
        {/* LOGO AREA: Glitch Effect */}
        <div className={styles.logoSection}>
          <Link href="/" className={styles.glitchLogo} data-text="FROST.BYTE">
            WIAM-Projet
          </Link>
          <span className={styles.version}>v.2.90</span>
        </div>

        {/* LINKS AREA */}
        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.path} 
                className={`${styles.link} ${isActive(item.path) ? styles.active : ''}`}
              >
                <span className={styles.bracket}>[</span>
                <span className={styles.text}>{item.name}</span>
                <span className={styles.bracket}>]</span>
                
                {/* L'effet d l'active background */}
                {isActive(item.path) && <div className={styles.activeGlow}></div>}
              </Link>
            </li>
          ))}
        </ul>

        {/* STATUS INDICATOR (Deco) */}
        <div className={styles.sysStatus}>
          <span className={styles.signalIcon}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </span>
          <span className={styles.statusText}>SYS.ONLINE</span>
        </div>

      </nav>
      
      {/* Animated Bottom Border */}
      <div className={styles.cyberLine}></div>
    </div>
  );
};

export default Navbar;