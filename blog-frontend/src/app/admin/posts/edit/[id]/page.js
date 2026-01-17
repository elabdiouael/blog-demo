'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Zidna useParams
import { updatePost, getCategories, getPostById } from '@/services/api';
import styles from './edit.module.css'; // T2kd bli had fichier css kayn 7da page.js
import Loader from '@/components/ui/Loader';

// ⚠️ Mola7ada: 7iyedna 'async' w 7iyedna { params } mn props
export default function EditPost() {
  const router = useRouter();
  
  // ✅ Hna fin kanjibo ID b tari9a s7i7a f Client Component
  const { id } = useParams(); 
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    category: null
  });

  useEffect(() => {
    // Kantsnaw id ykoun majoud 3ad n-chargiw data
    if (!id) return;

    Promise.all([getCategories(), getPostById(id)])
      .then(([catRes, postRes]) => {
        setCategories(catRes.data);
        const post = postRes.data;
        
        setFormData({
            title: post.title,
            description: post.description,
            content: post.content,
            imageUrl: post.imageUrl || '',
            category: post.category
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert("Error loading post data");
        router.push('/admin');
      });
  }, [id, router]);

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
      await updatePost(id, formData);
      alert('Post updated successfully! ✅');
      router.push('/admin');
    } catch (error) {
      console.error(error);
      alert('Error updating post');
    } finally {
      setLoading(false);
    }
  };

  if(loading) return <Loader />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Article</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <label>Title</label>
          <input 
            type="text" name="title" required 
            value={formData.title} onChange={handleChange} 
          />
        </div>

        <div className={styles.row}>
          <div className={styles.group}>
            <label>Category</label>
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
             <label>Image URL</label>
             <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
          </div>
        </div>

        <div className={styles.group}>
          <label>Short Description</label>
          <input type="text" name="description" required value={formData.description} onChange={handleChange} />
        </div>

        <div className={styles.group}>
          <label>Content</label>
          <textarea name="content" rows="10" required value={formData.content} onChange={handleChange} />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}