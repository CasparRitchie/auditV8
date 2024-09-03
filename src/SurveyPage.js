import React, { useEffect, useState } from 'react';
import SurveyTabs from './SurveyTabs';
import { useParams } from 'react-router-dom';

function SurveyPage() {
    const { id } = useParams();
    const [surveyData, setSurveyData] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/survey_structure')
            .then(response => response.json())
            .then(data => setSurveyData(data))
            .catch(error => console.error('Error fetching survey structure:', error));
    }, []);

    if (!surveyData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Survey for Audit {id}</h1>
            <SurveyTabs tabNumber={1} data={surveyData} />
        </div>
    );
}

export default SurveyPage;
