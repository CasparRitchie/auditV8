import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListAudits() {
    const [audits, setAudits] = useState([]);
    const columnOrder = [
        'id', 'manager', 'restaurant', 'customer', 'auditor', 'prenom', 'nom',
        'fonction', 'meals_per_day', 'seating_capacity', 'taux_rotation_global',
        'meals_served_today', 'taux_rotation_jour', 'start_time', 'end_time'
    ];

    useEffect(() => {
        async function fetchAudits() {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/audits');

                if (Array.isArray(response.data)) {
                    setAudits(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setAudits([]);
                }
            } catch (error) {
                console.error('Error fetching audits:', error);
                setAudits([]);
            }
        }

        fetchAudits();
    }, []);

    const capitalizeHeader = (header) => {
        return header.charAt(0).toUpperCase() + header.slice(1).replace('_', ' ');
    };

    return (
        <div className="container">
            <h1 className="mt-5">Existing Audits</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {columnOrder.map((key) => (
                            <th key={key}>{capitalizeHeader(key)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {audits.length > 0 ? (
                        audits.map((audit, index) => (
                            <tr key={index}>
                                {columnOrder.map((key, i) => (
                                    <td key={i}>{audit[key] !== null ? audit[key] : 'N/A'}</td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columnOrder.length} className="text-center">
                                No audits available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListAudits;
