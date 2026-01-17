'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loader from '@/components/ui/Loader';
import '../../styles/admin.css';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
    setChecking(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (checking) return <div style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}><Loader /></div>;
  if (!authorized) return null;

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-logo">
           Admin_Core<span style={{color:'#00f0ff'}}>.</span>
        </div>
        
        <nav>
          <Link href="/admin" className="nav-item">
            <span>📊</span> Dashboard
          </Link>
          <Link href="/admin/posts/create" className="nav-item">
            <span>📝</span> New Protocol
          </Link>
          <Link href="/" className="nav-item back-home">
             <span>🌐</span> Public Site
          </Link>
          
          <button onClick={handleLogout} className="nav-item logout-btn">
             ⚠️ TERMINATE SESSION
          </button>
        </nav>
        
        {/* Decorative Status Footer */}
        <div style={{marginTop:'auto', paddingTop:'2rem', fontSize:'0.7rem', color:'#475569', fontFamily:'monospace'}}>
           STATUS: ONLINE <br/>
           V.2.0.90
        </div>
      </aside>

      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}