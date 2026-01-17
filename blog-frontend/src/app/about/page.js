'use client';
import TiltCard from '@/components/ui/TiltCard';
import styles from './about.module.css';

export default function About() {
  
  const skills = [
    { name: 'Java / Spring Boot', level: '85%' }, 
    { name: 'React / Next.js', level: '80%' },
    { name: 'Database Design', level: '75%' }, 
    { name: 'UI/UX Basics', level: '70%' }, 
  ];

  return (
    <div className={styles.container}>
      {/* Background Ambience (Subtle) */}
      <div className={styles.ambientLight}></div>

      <div className={styles.wrapper}>
        <TiltCard>
          <div className={styles.card}>
            
            {/* LEFT SIDE: PROFILE */}
            <div className={styles.sidebar}>
              <div className={styles.avatarBox}>
                <div className={styles.avatarPlaceholder}>W</div>
              </div>
              
              <div className={styles.identity}>
                <h1 className={styles.name}>WIAM</h1>
                <span className={styles.badge}>JUNIOR DEVELOPER</span>
              </div>

              <div className={styles.divider}></div>

              <div className={styles.contactInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Location</span>
                  <span className={styles.value}>Morocco</span>
                </div>
 
              </div>
            </div>

            {/* RIGHT SIDE: CONTENT */}
            <div className={styles.mainContent}>
              
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>About Me</h2>
                <p className={styles.text}>
                  Hello! I am a passionate student specializing in full-stack development. 
                  My goal is to build scalable, efficient, and user-friendly applications using modern technologies 
                  like <strong>Spring Boot</strong> and <strong>Next.js</strong>.
                </p>
                <p className={styles.text}>
                  This project represents my journey in mastering the connection between a robust Java backend 
                  and a dynamic React frontend.
                </p>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Technical Proficiency</h2>
                <div className={styles.skillsGrid}>
                  {skills.map((skill, index) => (
                    <div key={index} className={styles.skillItem}>
                      <div className={styles.skillHeader}>
                        <span>{skill.name}</span>
                        <span>{skill.level}</span>
                      </div>
                      <div className={styles.progressBarBg}>
                        <div 
                          className={styles.progressBarFill} 
                          style={{width: skill.level}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className={styles.footerCredit}>
                <p>Academic Project • 2025-2026</p>
                <p>Supervised by: <span className={styles.profName}>Mr. Mohammed berrahal</span></p>
              </div>

            </div>

          </div>
        </TiltCard>
      </div>
    </div>
  );
}