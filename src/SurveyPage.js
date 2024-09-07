import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SurveyPage() {
    const { id } = useParams();
    const [surveyStructure, setSurveyStructure] = useState(null);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/survey_structure')
            .then(response => {
                setSurveyStructure(response.data);
            })
            .catch(error => {
                console.error('Error fetching survey structure:', error);
            });
    }, []);

    const handleAnswerChange = (chapitre, sousChapitre, paragraphe, sousParagraphe, question, value) => {
        setAnswers({
            ...answers,
            [`${chapitre}-${sousChapitre}-${paragraphe}-${sousParagraphe}-${question}`]: value,
        });
    };

    const handleSubmit = () => {
        axios.post(`http://127.0.0.1:5000/submit_answers/${id}`, answers)
            .then(response => {
                alert('Answers submitted successfully!');
            })
            .catch(error => {
                console.error('Error submitting answers:', error);
            });
    };

    const renderInputForQuestion = (responseType, chapitre, sousChapitre, paragraphe, sousParagraphe, question) => {
        const value = answers[`${chapitre}-${sousChapitre}-${paragraphe}-${sousParagraphe}-${question}`] || '';

        switch (responseType) {
            case 'C/PC/NC':
                return (
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="C"
                                checked={value === 'C'}
                                onChange={(e) => handleAnswerChange(chapitre, sousChapitre, paragraphe, sousParagraphe, question, e.target.value)}
                            /> C
                        </label>
                        <label className="ml-2">
                            <input
                                type="radio"
                                value="PC"
                                checked={value === 'PC'}
                                onChange={(e) => handleAnswerChange(chapitre, sousChapitre, paragraphe, sousParagraphe, question, e.target.value)}
                            /> PC
                        </label>
                        <label className="ml-2">
                            <input
                                type="radio"
                                value="NC"
                                checked={value === 'NC'}
                                onChange={(e) => handleAnswerChange(chapitre, sousChapitre, paragraphe, sousParagraphe, question, e.target.value)}
                            /> NC
                        </label>
                    </div>
                );

            case 'OK/KO':
                return (
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="OK"
                                checked={value === 'OK'}
                                onChange={(e) => handleAnswerChange(chapitre, sousChapitre, paragraphe, sousParagraphe, question, e.target.value)}
                            /> OK
                        </label>
                        <label className="ml-2">
                            <input
                                type="radio"
                                value="KO"
                                checked={value === 'KO'}
                                onChange={(e) => handleAnswerChange(chapitre, sousChapitre, paragraphe, sousParagraphe, question, e.target.value)}
                            /> KO
                        </label>
                    </div>
                );

            case 'Temperature':
                return (
                    <div>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter temperature"
                            value={value}
                            onChange={(e) => handleAnswerChange(chapitre, sousChapitre, paragraphe, sousParagraphe, question, e.target.value)}
                        />
                    </div>
                );

            default:
                return <p>Invalid Response Type</p>;
        }
    };

    const renderQuestions = (questions, chapitre, sousChapitre, paragraphe, sousParagraphe) => {
      return questions.map((questionObj, index) => (
          <div key={index} className="input-group mt-2">
              {/* Display the question text */}
              <span className="input-group-text">{questionObj.question}</span>

              {/* Render the appropriate input field */}
              {renderInputForQuestion(
                questionObj.responseType,
                chapitre,
                sousChapitre,
                paragraphe,
                sousParagraphe,
                questionObj.question
              )}

              <button className="btn btn-danger" onClick={() => handleRemoveQuestion(sousParagraphe, index)}>X</button>
          </div>
      ));
    };

    const renderSousParagraphe = (sousParagraphe, chapitre, sousChapitre, paragraphe) => {
        return Object.keys(sousParagraphe).map((key, index) => (
            <div key={index} className="card mt-2">
                <div className="card-header">{key}</div>
                <div className="card-body">
                    {/* Now we pass each question object to renderQuestions */}
                    {renderQuestions(sousParagraphe[key], chapitre, sousChapitre, paragraphe, key)}
                </div>
            </div>
        ));
    };

    const renderParagraphe = (paragraphe, chapitre, sousChapitre) => {
        return Object.keys(paragraphe).map((key, index) => (
            <div key={index} className="card mt-2">
                <div className="card-header">{key}</div>
                <div className="card-body">
                    {renderSousParagraphe(paragraphe[key], chapitre, sousChapitre, key)}
                </div>
            </div>
        ));
    };

    const renderSousChapitre = (sousChapitre, chapitre) => {
        return Object.keys(sousChapitre).map((key, index) => (
            <div key={index} className="card mt-2">
                <div className="card-header">{key}</div>
                <div className="card-body">
                    {renderParagraphe(sousChapitre[key], chapitre, key)}
                </div>
            </div>
        ));
    };

    const renderChapitre = () => {
        return Object.keys(surveyStructure).map((key, index) => (
            <div key={index} className="card mt-3">
                <div className="card-header">{key}</div>
                <div className="card-body">
                    {renderSousChapitre(surveyStructure[key], key)}
                </div>
            </div>
        ));
    };

    return (
        <div className="container">
            <h1>Survey for Audit {id}</h1>
            {surveyStructure ? (
                <>
                    {renderChapitre()}
                    <button className="btn btn-primary mt-4" onClick={handleSubmit}>Submit</button>
                </>
            ) : (
                <p>Loading survey structure...</p>
            )}
        </div>
    );
}

export default SurveyPage;
