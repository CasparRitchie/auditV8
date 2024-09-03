import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Survey() {
    const { id } = useParams();
    const [selfCount, setSelfCount] = useState('');
    const [cafeteriaCount, setCafeteriaCount] = useState('');
    const [snackingCount, setSnackingCount] = useState('');
    const [alternativePresence, setAlternativePresence] = useState('');
    const [frigoConnecte, setFrigoConnecte] = useState('');
    const [bonsens, setBonsens] = useState('');
    const [twenty, setTwenty] = useState('');
    const [bonheur, setBonheur] = useState('');
    const navigate = useNavigate();

    const submitSurvey = () => {
        const surveyData = {
            id: id,
            self_count: selfCount,
            cafeteria_count: cafeteriaCount,
            snacking_count: snackingCount,
            alternative_presence: alternativePresence,
            frigo_connecte: frigoConnecte,
            bonsens: bonsens,
            twenty: twenty,
            bonheur: bonheur
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
                <select
                    className="form-control"
                    value={alternativePresence}
                    onChange={(e) => setAlternativePresence(e.target.value)}
                >
                    <option value="">Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            {alternativePresence === 'Yes' && (
                <>
                    <div className="form-group">
                        <label>Frigo connecté:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={frigoConnecte}
                            onChange={(e) => setFrigoConnecte(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bonsens:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={bonsens}
                            onChange={(e) => setBonsens(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Twenty:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={twenty}
                            onChange={(e) => setTwenty(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bonheur:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={bonheur}
                            onChange={(e) => setBonheur(e.target.value)}
                        />
                    </div>
                </>
            )}

            <button className="btn btn-primary mt-3" onClick={submitSurvey}>Suivant</button>
        </div>
    );
}

export default Survey;
