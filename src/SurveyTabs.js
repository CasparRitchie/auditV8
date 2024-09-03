import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SurveyTabs() {
    const { id } = useParams();
    const [surveyStructure, setSurveyStructure] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/survey_structure')
            .then(response => {
                setSurveyStructure(response.data);
            })
            .catch(error => {
                console.error('Error fetching survey structure:', error);
            });
    }, []);

    const handleInputChange = (chapitre, sousChapitre, paragraphe, sousParagraphe, question, value) => {
        setSurveyStructure(prevState => ({
            ...prevState,
            [chapitre]: {
                ...prevState[chapitre],
                [sousChapitre]: {
                    ...prevState[chapitre][sousChapitre],
                    [paragraphe]: {
                        ...prevState[chapitre][sousChapitre][paragraphe],
                        [sousParagraphe]: prevState[chapitre][sousChapitre][paragraphe][sousParagraphe].map(q =>
                            q === question ? { ...q, answer: value } : q
                        )
                    }
                }
            }
        }));
    };

    const handleRemoveQuestion = (chapitre, sousChapitre, paragraphe, sousParagraphe, question) => {
        setSurveyStructure(prevState => ({
            ...prevState,
            [chapitre]: {
                ...prevState[chapitre],
                [sousChapitre]: {
                    ...prevState[chapitre][sousChapitre],
                    [paragraphe]: {
                        ...prevState[chapitre][sousChapitre][paragraphe],
                        [sousParagraphe]: prevState[chapitre][sousChapitre][paragraphe][sousParagraphe].filter(q => q !== question)
                    }
                }
            }
        }));
    };

    const handleAddProduct = (chapitre, sousChapitre, paragraphe, sousParagraphe) => {
        setSurveyStructure(prevState => ({
            ...prevState,
            [chapitre]: {
                ...prevState[chapitre],
                [sousChapitre]: {
                    ...prevState[chapitre][sousChapitre],
                    [paragraphe]: {
                        ...prevState[chapitre][sousChapitre][paragraphe],
                        [sousParagraphe]: [...prevState[chapitre][sousChapitre][paragraphe][sousParagraphe], `Produit ${prevState[chapitre][sousChapitre][paragraphe][sousParagraphe].length + 1}`]
                    }
                }
            }
        }));
    };

    const renderQuestions = (questions, chapitre, sousChapitre, paragraphe, sousParagraphe) => {
        return questions.map((question, index) => (
            <div key={index} className="input-group mb-2">
                <span className="input-group-text">{question}</span> {/* Display the question title */}
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your answer"
                    onChange={(e) => handleInputChange(chapitre, sousChapitre, paragraphe, sousParagraphe, question, e.target.value)}
                />
                <button className="btn btn-danger" onClick={() => handleRemoveQuestion(chapitre, sousChapitre, paragraphe, sousParagraphe, question)}>
                    Remove
                </button>
            </div>
        ));
    };

    const renderSousParagraphe = (sousParagrapheData, chapitre, sousChapitre, paragraphe) => {
        return Object.keys(sousParagrapheData).map((sousParagraphe, index) => (
            <div key={index} style={{ marginLeft: '20px' }}>
                <h5>{sousParagraphe}</h5>
                {renderQuestions(sousParagrapheData[sousParagraphe], chapitre, sousChapitre, paragraphe, sousParagraphe)}
                {sousParagraphe === 'Relevés des températures' && (
                    <button className="btn btn-secondary" onClick={() => handleAddProduct(chapitre, sousChapitre, paragraphe, sousParagraphe)}>
                        Add Product
                    </button>
                )}
            </div>
        ));
    };

    const renderParagraphe = (paragrapheData, chapitre, sousChapitre) => {
        return Object.keys(paragrapheData).map((paragraphe, index) => (
            <div key={index} style={{ marginLeft: '20px' }}>
                <h4>{paragraphe}</h4>
                {renderSousParagraphe(paragrapheData[paragraphe], chapitre, sousChapitre, paragraphe)}
            </div>
        ));
    };

    const renderSousChapitre = (sousChapitreData, chapitre) => {
        return Object.keys(sousChapitreData).map((sousChapitre, index) => (
            <div key={index} style={{ marginLeft: '20px' }}>
                <h3>{sousChapitre}</h3>
                {renderParagraphe(sousChapitreData[sousChapitre], chapitre, sousChapitre)}
            </div>
        ));
    };

    const renderChapitre = (chapitreData) => {
        return Object.keys(chapitreData).map((chapitre, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
                <h2>{chapitre}</h2>
                {renderSousChapitre(chapitreData[chapitre], chapitre)}
            </div>
        ));
    };

    return (
        <div className="container">
            <h1>Manage Survey Tabs for Audit {id}</h1>
            {surveyStructure ? renderChapitre(surveyStructure) : <p>Loading...</p>}
        </div>
    );
}

export default SurveyTabs;
