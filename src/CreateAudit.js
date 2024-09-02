import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateAudit() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        audit_date: new Date().toISOString().split('T')[0], // Default to today's date
        restaurant_name: '',
        manager: 'Auto géré',
        prenom: 'Test person prenom',
        nom: 'Test person nom',
        fonction: 'Chef',
        meals_per_day: 100,
        seating_capacity: 20,
        meals_served_today: '',
        start_time: '11:30',
        end_time: '14:00',
        previous_audits: []
    });

    const fetchPreviousAudits = async (restaurantName) => {
        if (!restaurantName) return;

        try {
            const response = await axios.get('http://127.0.0.1:5000/audits');
            console.log("Response from API:", response.data); // Debugging line

            if (Array.isArray(response.data)) {
                const validAudits = response.data.filter(audit => {
                    return audit.restaurant_name && audit.restaurant_name !== 'NaN';
                });

                const previousAudits = validAudits
                    .filter(audit => audit.restaurant_name === restaurantName)
                    .map(audit => audit.audit_date)
                    .filter(date => date && date !== 'NaN'); // Filter out NaN dates

                setFormData(prevData => ({ ...prevData, previous_audits: previousAudits }));
            } else {
                console.error("Expected an array but got:", response.data);
            }
        } catch (error) {
            console.error("Error fetching previous audits", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleInputBlur = (e) => {
        if (e.target.name === 'restaurant_name') {
            fetchPreviousAudits(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const seatingCapacityFactor = formData.seating_capacity * 0.8;
        const tauxRotationGlobal = formData.meals_per_day
            ? (formData.meals_per_day / seatingCapacityFactor) * 100
            : '';
        const tauxRotationJour = formData.meals_served_today
            ? (formData.meals_served_today / seatingCapacityFactor) * 100
            : '';

        const auditData = {
            ...formData,
            taux_rotation_global: tauxRotationGlobal ? tauxRotationGlobal.toFixed(2) : '',
            taux_rotation_jour: tauxRotationJour ? tauxRotationJour.toFixed(2) : ''
        };

        try {
            await axios.post('http://127.0.0.1:5000/audits', auditData);
            navigate('/view-audits');
        } catch (error) {
            console.error("There was an error creating the audit!", error);
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Créer un audit</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date de l'audit:</label>
                    <input
                        type="date"
                        name="audit_date"
                        value={formData.audit_date}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Nom du restaurant:</label>
                    <input
                        type="text"
                        name="restaurant_name"
                        value={formData.restaurant_name}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur} // Trigger previous audits fetch onBlur
                    />
                </div>
                <div>
                    <label>Gestionnaire:</label>
                    <input
                        type="text"
                        name="manager"
                        value={formData.manager}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Personne rencontrée - Prénom:</label>
                    <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Personne rencontrée - Nom:</label>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Personne rencontrée - Fonction:</label>
                    <input
                        type="text"
                        name="fonction"
                        value={formData.fonction}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Nombre de repas jour servis en moyenne:</label>
                    <input
                        type="number"
                        name="meals_per_day"
                        value={formData.meals_per_day}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Nombre de places assises:</label>
                    <input
                        type="number"
                        name="seating_capacity"
                        value={formData.seating_capacity}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Nombre de repas servis ce jour:</label>
                    <input
                        type="number"
                        name="meals_served_today"
                        value={formData.meals_served_today}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Horaires du self début:</label>
                    <input
                        type="time"
                        name="start_time"
                        value={formData.start_time}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Horaires du self fin:</label>
                    <input
                        type="time"
                        name="end_time"
                        value={formData.end_time}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Date(s) de(s) l'audit(s) précédent(s):</label>
                    <ul>
                        {formData.previous_audits.map((date, index) => (
                            <li key={index}>{date}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <button type="submit">Soumettre l'audit</button>
                </div>
            </form>
        </div>
    );
}

export default CreateAudit;
