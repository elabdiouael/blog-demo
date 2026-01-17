'use client';
import { useEffect, useState } from 'react';
// 👇 HNA KAN GHALAT: rddinha getAllPosts
import { getAllPosts } from '@/services/api'; 
import PostCard from './PostCard';
import Loader from '@/components/ui/Loader';
import styles from './PostList.module.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 👇 HNA TANI: khdmna b smiya s7i7a
    getAllPosts()
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading posts:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      
      {posts.length === 0 && (
         <p className={styles.empty}>Aucun article trouvé.</p>
      )}
    </div>
  );
};

export default PostList;