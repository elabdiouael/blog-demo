import './globals.css';
import Layout from '@/components/layout/Layout';
import SnowStorm from '@/components/ui/SnowStorm'; // Importina Telj

export const metadata = {
  title: 'FROST BYTE 2090',
  description: 'Winter is Digital',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Background K7el 3ami9 + Nebula khfifa */}
        <div className="quantum-bg" style={{background: '#02040a'}}>
             {/* Ila bghiti tkhlli nebula d 9bila khlliha, ila bghiti gha telj bou7do, 7eyed div d nebula */}
            <div className="nebula" style={{opacity: 0.3}}></div> 
        </div>

        {/* MOTEUR D TELJ ❄️ */}
        <SnowStorm />

        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}