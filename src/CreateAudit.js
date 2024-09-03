import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function CreateAudit() {
    const [manager, setManager] = useState('Sodexo');
    const [restaurant, setRestaurant] = useState('Nom du restaurant');
    const [customer, setCustomer] = useState('Allianz');
    const [auditor, setAuditor] = useState('ID Restauration');  // New Auditor field
    const [prenom, setPrenom] = useState('Prénom');
    const [nom, setNom] = useState('Nom');
    const [fonction, setFonction] = useState('Fonction');
    const [mealsPerDay, setMealsPerDay] = useState(100);
    const [seatingCapacity, setSeatingCapacity] = useState(50);
    const [mealsServedToday, setMealsServedToday] = useState('');
    const [startTime, setStartTime] = useState('11:30');
    const [endTime, setEndTime] = useState('14:00');
    const [previousAudits, setPreviousAudits] = useState([]);
    const navigate = useNavigate();

    // Calculate Taux de rotation global
    const tauxRotationGlobal = (mealsPerDay / (seatingCapacity * 0.8));

    // Calculate Taux de rotation du jour
    const tauxRotationJour = mealsServedToday
        ? (mealsServedToday / (seatingCapacity * 0.8))
        : '';

    const submitAudit = () => {
        const auditData = {
            manager: manager,
            restaurant: restaurant,
            customer: customer,
            auditor: auditor,
            prenom: prenom,
            nom: nom,
            fonction: fonction,
            meals_per_day: mealsPerDay,
            seating_capacity: seatingCapacity,
            taux_rotation_global: tauxRotationGlobal.toFixed(2),
            meals_served_today: mealsServedToday,
            taux_rotation_jour: mealsServedToday ? tauxRotationJour.toFixed(2) : null,
            start_time: startTime,
            end_time: endTime,
        };

        axios.post('http://127.0.0.1:5000/submit_audit', auditData)
            .then(response => {
                console.log('Audit submitted successfully:', response.data);
                const auditId = response.data.id;  // Assuming the response returns the new audit ID
                navigate(`/survey/${auditId}`);  // Redirect to the survey page with the audit ID
            })
            .catch(error => {
                console.error('Error submitting audit:', error);
            });
    };

    const fetchPreviousAudits = () => {
        if (!restaurant) return;

        axios.get('http://127.0.0.1:5000/api/audits')
            .then(response => {
                const previous = response.data.filter(audit => audit.restaurant === restaurant);
                setPreviousAudits(previous);
            })
            .catch(error => {
                console.error('Error fetching previous audits:', error);
            });
    };

    const handleRestaurantBlur = () => {
        fetchPreviousAudits();
    };

    return (
        <div className="container" style={{ maxWidth: '600px', marginTop: '50px' }}>
            <h1 className="mb-4 text-center">Create Audit</h1>
            {/* Input fields and previous audits list */}
            <div className="mb-3">
                <label className="form-label">Manager Name:</label>
                <input
                    type="text"
                    className="form-control"
                    value={manager}
                    onChange={(e) => setManager(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Restaurant Name:</label>
                <input
                    type="text"
                    className="form-control"
                    value={restaurant}
                    onChange={(e) => setRestaurant(e.target.value)}
                    onBlur={handleRestaurantBlur}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Customer:</label>
                <input
                    type="text"
                    className="form-control"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Auditor Name:</label>
                <input
                    type="text"
                    className="form-control"
                    value={auditor}
                    onChange={(e) => setAuditor(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Personne rencontrée - Prénom:</label>
                <input
                    type="text"
                    className="form-control"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Personne rencontrée - Nom:</label>
                <input
                    type="text"
                    className="form-control"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Personne rencontrée - Fonction:</label>
                <input
                    type="text"
                    className="form-control"
                    value={fonction}
                    onChange={(e) => setFonction(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Nombre de repas jour servis en moyenne:</label>
                <input
                    type="number"
                    className="form-control"
                    value={mealsPerDay}
                    onChange={(e) => setMealsPerDay(Number(e.target.value))}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Nombre de places assises:</label>
                <input
                    type="number"
                    className="form-control"
                    value={seatingCapacity}
                    onChange={(e) => setSeatingCapacity(Number(e.target.value))}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Taux de rotation global:</label>
                <input
                    type="text"
                    className="form-control"
                    value={tauxRotationGlobal.toFixed(2) + '%'}
                    disabled
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Nombre de repas servis ce jour:</label>
                <input
                    type="number"
                    className="form-control"
                    value={mealsServedToday}
                    onChange={(e) => setMealsServedToday(Number(e.target.value))}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Taux de rotation du jour:</label>
                <input
                    type="text"
                    className="form-control"
                    value={tauxRotationJour ? tauxRotationJour.toFixed(2) + '%' : 'N/A'}
                    disabled
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Horaires du self début:</label>
                <input
                    type="time"
                    className="form-control"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Horaires du self fin:</label>
                <input
                    type="time"
                    className="form-control"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />
            </div>

            {previousAudits.length > 0 && (
                <div className="mb-3">
                    <label className="form-label">Audit(s) précédents:</label>
                    <ul className="list-group">
                        {previousAudits.map((audit, index) => (
                            <li key={index} className="list-group-item">
                                <Link to={`/view_audit/${audit.id}`}>
                                    ID: {audit.id}, Manager: {audit.manager}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button onClick={submitAudit} className="btn btn-primary mt-3">Suivant</button>
        </div>
    );
}

export default CreateAudit;
