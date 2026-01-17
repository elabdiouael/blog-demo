'use client';
import { useEffect, useState } from 'react';
import { getPostById } from '@/services/api';
import Loader from '@/components/ui/Loader';
import CommentList from '@/components/comment/CommentList';
import Link from 'next/link';
// import HackerText from '@/components/ui/HackerText'; <--- Supprimé
import styles from './PostDetail.module.css';

const PostDetail = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPostById(postId)
      .then(response => {
        setPost(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching post:", err);
        setError("Impossible de charger l'article.");
        setLoading(false);
      });
  }, [postId]);

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>ERREUR: {error}</div>;
  if (!post) return null;

  return (
    <article className={styles.articleContainer}>
      
      {/* HEADER SECTION (Titre + Meta) */}
      <header className={styles.header}>
        <div className={styles.metaTop}>
          <span className={styles.categoryBadge}>
            {post.category ? post.category.name : 'GÉNÉRAL'}
          </span>
          <span className={styles.date}>
            {new Date(post.createdAt).toLocaleDateString('fr-FR', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </span>
        </div>

        {/* TITRE CLEAN (Sans animation Matrix) */}
        <h1 className={styles.title}>
           {post.title}
        </h1>

        <div className={styles.authorRow}>
           <div className={styles.authorAvatar}>A</div>
           <div className={styles.authorInfo}>
              <span className={styles.authorName}>Admin</span>
              <span className={styles.readTime}>5 min de lecture</span>
           </div>
        </div>
      </header>

      {/* IMAGE PRINCIPALE */}
      {post.imageUrl && (
        <div className={styles.imageWrapper}>
          <img src={post.imageUrl} alt={post.title} className={styles.image} />
          <div className={styles.imageGlow}></div>
        </div>
      )}

      {/* CONTENU DE L'ARTICLE */}
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* NAVIGATION BAS */}
      <div className={styles.footerNav}>
        <Link href="/" className={styles.backButton}>
          ← RETOUR À L'ACCUEIL
        </Link>
      </div>

      <div className={styles.divider}>
         <span>COMMENTAIRES</span>
      </div>
      
      {/* SECTION COMMENTAIRES */}
      <div className={styles.commentsSection}>
          <CommentList postId={postId} />
      </div>
      
    </article>
  );
};

export default PostDetail;