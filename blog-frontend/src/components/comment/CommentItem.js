import styles from './CommentItem.module.css';

const CommentItem = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.avatar}>
        {comment.authorName.charAt(0).toUpperCase()}
      </div>
      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.author}>{comment.authorName}</span>
          <span className={styles.date}>
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className={styles.content}>{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentItem;