import PostList from '@/components/post/PostList';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      
      {/* HERO SECTION: Intro Wiam & Prof */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className={styles.subTitle}>PROJET</h2>
          
          <h1 className={styles.mainTitle}>
            <span className={styles.prefix}>RÉALISÉ PAR:</span>
            <span className={styles.name}>WIAM</span>
          </h1>

          <div className={styles.profBox}>
            <span className={styles.profLabel}>ENCADRÉ PAR:</span>
            <span className={styles.profName}>Mr. Mohammed berrahal</span>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className={styles.scrollDown}>
          <span>SCROLL TO EXPLORE</span>
          <div className={styles.line}></div>
        </div>
      </section>

      {/* POSTS GRID */}
      <section id="posts" className={styles.postsSection}>
        <header className={styles.postsHeader}>
          <h2 className={styles.sectionTitle}>LATEST_LOGS</h2>
          <div className={styles.divider}></div>
        </header>
        <PostList />
      </section>

    </div>
  );
}