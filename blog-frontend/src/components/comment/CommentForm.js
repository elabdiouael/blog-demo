import { useState } from 'react';
import { addComment } from '@/services/api';
import styles from './CommentForm.module.css';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [formData, setFormData] = useState({ authorName: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null); // Bach n3rfo chkon li active

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addComment({ ...formData, post: { id: postId } });
      setFormData({ authorName: '', content: '' });
      if (onCommentAdded) onCommentAdded();
    } catch (error) {
      console.error("Failed to post comment", error);
      alert("TRANSMISSION_FAILED: Error posting comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.terminalBox}>
      <div className={styles.headerRow}>
        <span className={styles.statusLight}></span>
        <h4 className={styles.title}>INITIATE_TRANSMISSION</h4>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        
        {/* INPUT: NAME */}
        <div className={`${styles.group} ${focusedField === 'name' ? styles.active : ''}`}>
          <label className={styles.label}>// IDENTITY</label>
          <input 
            type="text" 
            placeholder="Enter Codename..." 
            required
            value={formData.authorName}
            onChange={(e) => setFormData({...formData, authorName: e.target.value})}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            className={styles.input}
          />
          <div className={styles.corner}></div>
        </div>

        {/* INPUT: MESSAGE */}
        <div className={`${styles.group} ${focusedField === 'msg' ? styles.active : ''}`}>
          <label className={styles.label}>// DATA_PACKET</label>
          <textarea 
            placeholder="Type your message protocol here..." 
            required
            rows="3"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            onFocus={() => setFocusedField('msg')}
            onBlur={() => setFocusedField(null)}
            className={styles.textarea}
          ></textarea>
           <div className={styles.corner}></div>
        </div>

        <button type="submit" disabled={loading} className={styles.cyberButton}>
          {loading ? 'TRANSMITTING...' : 'SEND_DATA >'}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;