'use client';
import { useEffect, useState } from 'react';
import { getCommentsByPost, createComment, deleteComment } from '@/services/api';
import styles from './CommentList.module.css';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);

  // 1. Initialisation
  useEffect(() => {
    fetchComments();
    
    // Nchufo chkon li connecte
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Erreur user parsing", e);
      }
    }
  }, [postId]);

  const fetchComments = () => {
    getCommentsByPost(postId)
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
  };

  // 2. Ajout Commentaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      content: newComment,
      postId: postId,
      username: user ? user.username : 'Visiteur'
    };

    try {
      await createComment(commentData);
      setNewComment('');
      fetchComments(); 
    } catch (err) {
      alert("Erreur lors de l'envoi.");
    }
  };

  // 3. Suppression (ADMIN ONLY)
  const handleDelete = async (commentId) => {
    if (window.confirm("⚠️ Supprimer ce commentaire ? Cette action est irréversible.")) {
      try {
        await deleteComment(commentId);
        // N7ydouh mn l ecran bla refresh
        setComments(comments.filter(c => c.id !== commentId));
      } catch (err) {
        alert("Erreur: Impossible de supprimer.");
      }
    }
  };

  // Helper: Wach Admin?
  const isAdmin = () => {
    if (!user) return false;
    // Checki b username ola role
    if (user.username === 'admin') return true;
    if (user.roles && user.roles.includes('ADMIN')) return true;
    return false;
  };

  return (
    <div className={styles.wrapper}>
      
      {/* Formulaire */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          className={styles.textarea}
          placeholder="Écrire un commentaire..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="3"
        />
        <button type="submit" className={styles.submitBtn}>
          ENVOYER
        </button>
      </form>

      {/* Liste */}
      <div className={styles.list}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.commentCard}>
            
            <div className={styles.header}>
               <div className={styles.userInfo}>
                 <div className={styles.avatar}>
                    {comment.username ? comment.username.charAt(0).toUpperCase() : 'V'}
                 </div>
                 <div className={styles.meta}>
                    <span className={styles.author}>{comment.username || 'Visiteur'}</span>
                    <span className={styles.date}>
                      {new Date(comment.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                 </div>
               </div>

               {/* 🛑 BOUTON SUPPRIMER (Admin Only) */}
               {isAdmin() && (
                 <button 
                   className={styles.deleteBtn}
                   onClick={() => handleDelete(comment.id)}
                   title="Supprimer"
                 >
                   ✖
                 </button>
               )}
            </div>

            <p className={styles.content}>{comment.content}</p>
          </div>
        ))}

        {comments.length === 0 && (
          <p className={styles.empty}>Aucun commentaire pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default CommentList;