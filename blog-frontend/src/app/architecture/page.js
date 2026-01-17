'use client';
import TiltCard from '@/components/ui/TiltCard';
import styles from './architecture.module.css';

const architectureData = [
  {
    id: '01',
    title: 'Le Contrôleur',
    sub: 'Interface API',
    role: "Point d'entrée des requêtes HTTP.",
    action: "Reçoit les demandes du Frontend (Next.js) et renvoie les réponses JSON standardisées.",
    example: "GET /api/posts → Renvoie la liste des articles.",
    icon: '⚡',
    color: '#38bdf8' // Bleu
  },
  {
    id: '02',
    title: 'Le Service',
    sub: 'Logique Métier',
    role: "Cerveau de l'application.",
    action: "Applique les règles de gestion, valide les données et orchestre les transactions.",
    example: "Vérifie si un utilisateur est banni avant de poster.",
    icon: '🧠',
    color: '#fbbf24' // Or
  },
  {
    id: '03',
    title: 'Le Repository',
    sub: 'Accès Données',
    role: "Couche de persistance (JPA).",
    action: "Transforme les objets Java en requêtes SQL pour communiquer avec MySQL.",
    example: "save(post) → INSERT INTO posts...",
    icon: '💾',
    color: '#34d399' // Vert
  },
  {
    id: '04',
    title: 'Les Entités',
    sub: 'Modèle de Données',
    role: "Représentation des tables.",
    action: "Mappe chaque classe Java à une table de base de données via Hibernate.",
    example: "L'entité 'User' correspond à la table 'users'.",
    icon: '🗂',
    color: '#818cf8' // Indigo
  },
  {
    id: '05',
    title: 'Les DTOs',
    sub: 'Transport Objets',
    role: "Sécurité et Filtrage.",
    action: "Transfère uniquement les données nécessaires entre le client et le serveur.",
    example: "AuthDTO contient username/password sans l'ID.",
    icon: '📦',
    color: '#c084fc' // Violet
  },
  {
    id: '06',
    title: 'Configuration',
    sub: 'Paramètres',
    role: "Initialisation du système.",
    action: "Gère la sécurité (CORS, JWT), la base de données et les propriétés globales.",
    example: "application.properties définit le port 8080.",
    icon: '⚙️',
    color: '#f472b6' // Rose
  }
];

export default function ArchitecturePage() {
  return (
    <div className={styles.container}>
      {/* Background Removed - Just Clean Dark */}
      
      <header className={styles.header}>
        <h1 className={styles.mainTitle}>Architecture Système</h1>
        <div className={styles.subtitle}>DOCUMENTATION TECHNIQUE V1.0</div>
      </header>

      <div className={styles.grid}>
        {architectureData.map((item) => (
          /* 3D TILT CARD WRAPPER */
          <TiltCard key={item.id}>
            <div className={styles.cardInner} style={{borderTopColor: item.color}}>
              
              <div className={styles.cardHeader}>
                <span className={styles.idNumber}>{item.id}</span>
                <div className={styles.iconDot} style={{color: item.color, borderColor: item.color}}>
                   {item.icon}
                </div>
              </div>

              <h2 className={styles.cardTitle}>
                {item.title}
              </h2>
              <span className={styles.sub}>{item.sub}</span>

              <div className={styles.content}>
                <div className={styles.row}>
                  <span className={styles.label}>RÔLE PRINCIPAL</span>
                  <p className={styles.textValue}>{item.role}</p>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>FONCTIONNEMENT</span>
                  <p className={styles.textValue}>{item.action}</p>
                </div>
                
                <div className={styles.exampleBox}>
                   <span className={styles.label} style={{color: item.color}}>EXEMPLE CONCRET :</span>
                   <p className={styles.exampleText}>{item.example}</p>
                </div>
              </div>

            </div>
          </TiltCard>
        ))}
      </div>
      
      <div className={styles.footer}>
         Développé avec Spring Boot 3 & Next.js 16
      </div>
    </div>
  );
}