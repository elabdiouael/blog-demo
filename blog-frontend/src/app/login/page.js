'use client';
import { useState } from 'react';
import { login } from '@/services/api';
import { useRouter } from 'next/navigation';
import TiltCard from '@/components/ui/TiltCard';
import HackerText from '@/components/ui/HackerText';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if(error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Slight delay for "Authenticating" effect
    setTimeout(async () => {
        try {
          const res = await login(credentials);
          localStorage.setItem('user', JSON.stringify(res.data));
          router.push('/admin');
        } catch (err) {
          setError('ACCESS_DENIED: Invalid Credentials');
          setLoading(false);
        }
    }, 800);
  };

  return (
    <div className={styles.container}>
      <div className={styles.gridOverlay}></div>

      <TiltCard>
        <div className={styles.loginCard}>
          
          <div className={styles.header}>
            <h1 className={styles.logo}>
                <HackerText text="SYSTEM_LOGIN" />
            </h1>
            <p className={styles.subText}>SECURE ACCESS REQUIRED</p>
          </div>

          {error && (
            <div className={styles.errorBox}>
               ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            <div className={styles.group}>
              <input 
                type="text" 
                name="username" 
                placeholder="USERNAME" 
                required 
                className={styles.input} 
                onChange={handleChange}
                autoComplete="off"
              />
              <span className={styles.inputIcon}>👤</span>
            </div>

            <div className={styles.group}>
              <input 
                type="password" 
                name="password" 
                placeholder="PASSWORD" 
                required 
                className={styles.input} 
                onChange={handleChange}
              />
              <span className={styles.inputIcon}>🔒</span>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'AUTHENTICATING...' : 'ENTER_SYSTEM'}
            </button>

          </form>
        </div>
      </TiltCard>
    </div>
  );
}