'use client';
import { useEffect, useState } from 'react';
// 👇 HNA KAN L'ERREUR: Beddelna getPosts b getAllPosts
import { getAllPosts, deletePost } from '@/services/api'; 
import Loader from '@/components/ui/Loader';
import Link from 'next/link';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = () => {
    // 👇 HNA TANI: khdmna b smiya s7i7a
    getAllPosts().then(res => {
      setPosts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if(confirm('WARNING: Deleting data node. Confirm?')) {
      try {
        await deletePost(id);
        setPosts(posts.filter(p => p.id !== id));
      } catch (error) {
        alert('Deletion Failed');
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      {/* Header Area */}
      <div className="page-header">
        <div>
           <h1 className="page-title">SYSTEM_OVERVIEW</h1>
           <p style={{color:'#94a3b8', marginTop:'5px'}}>// MONITORING ACTIVE LOGS</p>
        </div>
        <Link href="/admin/posts/create" className="create-btn">
          + INITIATE NEW LOG
        </Link>
      </div>

      {/* Quick Stats (Fake Data for Design) */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'1.5rem', marginBottom:'3rem'}}>
         <div style={{background:'rgba(0,240,255,0.05)', border:'1px solid rgba(0,240,255,0.2)', padding:'1.5rem', borderRadius:'8px'}}>
            <h3 style={{color:'#94a3b8', fontSize:'0.8rem', fontFamily:'Orbitron'}}>TOTAL LOGS</h3>
            <p style={{color:'#fff', fontSize:'2rem', fontWeight:'bold'}}>{posts.length}</p>
         </div>
         <div style={{background:'rgba(245,158,11,0.05)', border:'1px solid rgba(245,158,11,0.2)', padding:'1.5rem', borderRadius:'8px'}}>
            <h3 style={{color:'#94a3b8', fontSize:'0.8rem', fontFamily:'Orbitron'}}>SYSTEM STATUS</h3>
            <p style={{color:'#f59e0b', fontSize:'1.5rem', fontWeight:'bold'}}>STABLE</p>
         </div>
         <div style={{background:'rgba(16,185,129,0.05)', border:'1px solid rgba(16,185,129,0.2)', padding:'1.5rem', borderRadius:'8px'}}>
            <h3 style={{color:'#94a3b8', fontSize:'0.8rem', fontFamily:'Orbitron'}}>SERVER UPTIME</h3>
            <p style={{color:'#10b981', fontSize:'1.5rem', fontWeight:'bold'}}>99.9%</p>
         </div>
      </div>

      {/* The Data Grid */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID_REF</th>
              <th>LOG_TITLE</th>
              <th>CATEGORY_TAG</th>
              <th>TIMESTAMP</th>
              <th>CONTROLS</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td className="id-cell">#{post.id.toString().padStart(4, '0')}</td>
                <td style={{fontWeight:'bold', color:'#fff'}}>{post.title}</td>
                <td>
                  <span className="cat-badge">
                    {post.category ? post.category.name : 'NULL_PTR'}
                  </span>
                </td>
                <td style={{fontFamily:'monospace', color:'#94a3b8'}}>
                    {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <Link href={`/admin/posts/edit/${post.id}`} className="action-btn edit-btn">
                    EDIT
                  </Link>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(post.id)}
                  >
                    PURGE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}