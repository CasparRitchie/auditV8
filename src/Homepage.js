import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Application d'audit</h1>

            <div>
                <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>
                    <Link to="/list_audits" style={{ textDecoration: 'none', color: 'black' }}>Voir les audits</Link>
                </button>
                <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>
                    <Link to="/create-audit" style={{ textDecoration: 'none', color: 'black' }}>Créer un audit</Link>
                </button>
            </div>

            <div style={{ marginTop: '40px' }}>
                <h2>Statistiques des audits</h2>
                <img src="http://127.0.0.1:5000/audit_chart" alt="Audit Chart" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
        </div>
    );
}

export default HomePage;
