'use client';
import Link from 'next/link';
import TiltCard from '../ui/TiltCard';
// HackerText mchatt, mab9inach 7tajinha
import styles from './PostCard.module.css';

const PostCard = ({ post }) => {
  return (
    <TiltCard>
      <Link href={`/posts/${post.id}`} className={styles.cardWrapper}>
        
        <div className={styles.innerCard}>
          {/* Background Decoration */}
          <div className={styles.gridBg}></div>

          <div className={styles.content}>
            
            <div className={styles.header}>
               <span className={styles.category}>
                 {post.category ? post.category.name : 'TECHNOLOGIE'}
               </span>
               <div className={styles.statusDot}></div>
            </div>
            
            {/* Titre Normal (Clean) */}
            <h2 className={styles.title}>
              {post.title}
            </h2>
            
            <p className={styles.excerpt}>
               {/* Coupe le texte s'il est trop long */}
               {post.description ? 
                  (post.description.length > 100 ? post.description.substring(0, 100) + '...' : post.description) 
                  : 'Aucune description disponible.'}
            </p>
            
            <div className={styles.footer}>
              <span className={styles.date}>
                {/* Format Date Français */}
                {new Date(post.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
              
              <div className={styles.actionBtn}>
                LIRE L'ARTICLE
                <span className={styles.arrow}>→</span>
              </div>
            </div>

          </div>
        </div>
      </Link>
    </TiltCard>
  );
};

export default PostCard;