import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ViewAudit() {
    const { id } = useParams();
    const [audit, setAudit] = useState(null);

    useEffect(() => {
      async function fetchAudit() {
          try {
              const response = await axios.get(`http://127.0.0.1:5000/api/audits/${id}`);
              setAudit(response.data);
          } catch (error) {
              console.error('Error fetching audit details:', error);
          }
      }

      fetchAudit();
  }, [id]);

    if (!audit) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Audit Details for {audit.restaurant}</h1>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td>{audit.id}</td>
                    </tr>
                    <tr>
                        <th>Manager</th>
                        <td>{audit.manager}</td>
                    </tr>
                    <tr>
                        <th>Restaurant</th>
                        <td>{audit.restaurant}</td>
                    </tr>
                    <tr>
                        <th>Date of Audit</th>
                        <td>{audit.audit_date}</td>
                    </tr>
                    <tr>
                        <th>Previous Audits</th>
                        <td>
                            {audit.previous_audits && audit.previous_audits.length > 0 ? (
                                <ul>
                                    {audit.previous_audits.map((prevAudit, index) => (
                                        <li key={index}>{prevAudit}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No previous audits</p>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ViewAudit;
