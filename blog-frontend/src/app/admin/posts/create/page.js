'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, getCategories } from '@/services/api';
import Loader from '@/components/ui/Loader';
import styles from './create.module.css';

export default function CreatePost() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    category: null 
  });

  useEffect(() => {
    getCategories().then(res => {
      setCategories(res.data);
      if (res.data.length > 0) {
        setFormData(prev => ({ ...prev, category: res.data[0] }));
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    const selectedCat = categories.find(c => c.id == catId);
    setFormData(prev => ({ ...prev, category: selectedCat }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPost(formData);
      // alert('PROTOCOL_INITIATED: Post created successfully!'); // Optional Cyber Alert
      router.push('/admin');
    } catch (error) {
      console.error(error);
      alert('SYSTEM_ERROR: Creation Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>INITIATE NEW PROTOCOL</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        
        {/* Title Input */}
        <div className={styles.group}>
          <label>Project Title / Subject</label>
          <input 
            type="text" name="title" required 
            placeholder="Ex: NEURAL_NETWORK_V2"
            value={formData.title} onChange={handleChange} 
          />
        </div>

        {/* Row: Category & Image */}
        <div className={styles.row}>
          <div className={styles.group}>
            <label>Classification (Category)</label>
            <select 
                onChange={handleCategoryChange} 
                className={styles.select}
                value={formData.category?.id || ''}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.group}>
             <label>Asset Link (Image URL)</label>
             <input 
                type="text" name="imageUrl" 
                placeholder="https://..." 
                value={formData.imageUrl} onChange={handleChange} 
             />
          </div>
        </div>

        {/* Description */}
        <div className={styles.group}>
          <label>Briefing (Short Desc)</label>
          <input 
             type="text" name="description" required 
             placeholder="Summary of the operation..."
             value={formData.description} onChange={handleChange} 
          />
        </div>

        {/* Content Area */}
        <div className={styles.group}>
          <label>Data Log (Content)</label>
          <textarea 
             name="content" rows="12" required 
             placeholder="Enter main data stream here..." 
             value={formData.content} onChange={handleChange} 
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'UPLOADING DATA...' : 'PUBLISH PROTOCOL'}
        </button>
      </form>
    </div>
  );
}