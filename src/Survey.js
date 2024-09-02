import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Survey() {
    const { id } = useParams();
    const [selfCount, setSelfCount] = useState('');
    const [cafeteriaCount, setCafeteriaCount] = useState('');
    const [snackingCount, setSnackingCount] = useState('');
    const [alternativePresence, setAlternativePresence] = useState('');
    const [connectedFridge, setConnectedFridge] = useState('');
    const navigate = useNavigate();

    const submitSurvey = () => {
        const surveyData = {
            id: id,
            self_count: selfCount,
            cafeteria_count: cafeteriaCount,
            snacking_count: snackingCount,
            alternative_presence: alternativePresence,
            connected_fridge: connectedFridge
        };

        axios.post(`http://127.0.0.1:5000/submit_survey/${id}`, surveyData)
            .then(response => {
                console.log('Survey submitted successfully:', response.data);
                navigate('/list_audits');  // Redirect to the list audits page after submission
            })
            .catch(error => {
                console.error('Error submitting survey:', error);
            });
    };

    return (
        <div className="container" style={{ padding: '50px' }}>
            <h1>Survey for Audit {id}</h1>
            <div className="form-group">
                <label>Nombre de self(s):</label>
                <input
                    type="number"
                    className="form-control"
                    value={selfCount}
                    onChange={(e) => setSelfCount(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Nombre de Caféteria(s):</label>
                <input
                    type="number"
                    className="form-control"
                    value={cafeteriaCount}
                    onChange={(e) => setCafeteriaCount(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Nombre de Snacking(s):</label>
                <input
                    type="number"
                    className="form-control"
                    value={snackingCount}
                    onChange={(e) => setSnackingCount(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Présence de restauration alternative:</label>
                <input
                    type="text"
                    className="form-control"
                    value={alternativePresence}
                    onChange={(e) => setAlternativePresence(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Frigo connecté:</label>
                <input
                    type="text"
                    className="form-control"
                    value={connectedFridge}
                    onChange={(e) => setConnectedFridge(e.target.value)}
                />
            </div>

            <button className="btn btn-primary" onClick={submitSurvey}>Submit Survey</button>
        </div>
    );
}

export default Survey;
