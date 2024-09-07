import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SurveyTabs() {
    const { id, selfCount } = useParams();
    const [surveyStructure, setSurveyStructure] = useState(null);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    const selfCountNumber = parseInt(selfCount, 10);

    useEffect(() => {
        if (isNaN(selfCountNumber) || selfCountNumber < 1) {
            alert("Invalid number of tabs.");
            navigate('/list_audits');
            return;
        }

        axios.get('http://127.0.0.1:5000/api/survey_structure')
            .then(response => {
                setSurveyStructure(response.data);
            })
            .catch(error => {
                console.error('Error fetching survey structure:', error);
            });
    }, [selfCountNumber, navigate]);

    const handleRemoveItem = (parent, key) => {
        delete parent[key];
        setSurveyStructure({ ...surveyStructure });
    };

    const handleRemoveQuestion = (sousParagraphe, index) => {
        sousParagraphe.splice(index, 1);
        setSurveyStructure({ ...surveyStructure });
    };

    const handleAnswerChange = (questionId, answer) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleSubmit = () => {
        // Submit the answers to the backend
        axios.post(`http://127.0.0.1:5000/submit_answers/${id}`, answers)
            .then(response => {
                console.log('Answers submitted successfully:', response.data);
                navigate('/list_audits');
            })
            .catch(error => {
                console.error('Error submitting answers:', error);
            });
    };

    const renderQuestions = (questions, sousParagraphe, parentId) => {
      return questions.map((questionObj, index) => {
          const questionId = `${parentId}_${index}`;
          const questionText = questionObj.question; // Access the question text
          const responseType = questionObj.responseType; // Access the response type

          // Based on the responseType, render the appropriate input
          const renderResponseOptions = () => {
              switch (responseType) {
                  case 'C/PC/NC':
                      return (
                          <div className="btn-group ml-2" role="group">
                              <input
                                  type="radio"
                                  name={questionId}
                                  value="C"
                                  onChange={() => handleAnswerChange(questionId, 'C')}
                              /> C
                              <input
                                  type="radio"
                                  name={questionId}
                                  value="PC"
                                  onChange={() => handleAnswerChange(questionId, 'PC')}
                              /> PC
                              <input
                                  type="radio"
                                  name={questionId}
                                  value="NC"
                                  onChange={() => handleAnswerChange(questionId, 'NC')}
                              /> NC
                          </div>
                      );
                  case 'OK/KO':
                      return (
                          <div className="btn-group ml-2" role="group">
                              <input
                                  type="radio"
                                  name={questionId}
                                  value="OK"
                                  onChange={() => handleAnswerChange(questionId, 'OK')}
                              /> OK
                              <input
                                  type="radio"
                                  name={questionId}
                                  value="KO"
                                  onChange={() => handleAnswerChange(questionId, 'KO')}
                              /> KO
                          </div>
                      );
                  case 'Temperature':
                      return (
                          <div>
                              <input
                                  type="number"
                                  placeholder="Enter temperature"
                                  className="form-control"
                                  onChange={(e) => handleAnswerChange(questionId, e.target.value)}
                              />
                          </div>
                      );
                  default:
                      return <p>Unknown response type</p>;
              }
          };

          return (
              <div key={index} className="input-group mt-2">
                  <span className="input-group-text">{questionText}</span>
                  {renderResponseOptions()}
                  <button className="btn btn-danger btn-sm ml-2" onClick={() => handleRemoveQuestion(sousParagraphe, index)}>X</button>
              </div>
          );
      });
  };

    const renderSousParagraphe = (sousParagraphe, parentId) => {
        return Object.keys(sousParagraphe).map((key, index) => (
            <div key={index} className="card mt-2">
                <div className="card-header">
                    <span>{key}</span>
                    <button className="btn btn-danger btn-sm mt-2" onClick={() => handleRemoveItem(sousParagraphe, key)}>X</button>
                </div>
                <div className="card-body">
                    {renderQuestions(sousParagraphe[key], sousParagraphe[key], `${parentId}_${index}`)}
                </div>
            </div>
        ));
    };

    const renderParagraphe = (paragraphe, parentId) => {
        return Object.keys(paragraphe).map((key, index) => (
            <div key={index} className="card mt-2">
                <div className="card-header">
                    <span>{key}</span>
                    <button className="btn btn-danger btn-sm mt-2" onClick={() => handleRemoveItem(paragraphe, key)}>X</button>
                </div>
                <div className="card-body">
                    {renderSousParagraphe(paragraphe[key], `${parentId}_${index}`)}
                </div>
            </div>
        ));
    };

    const renderSousChapitre = (sousChapitre, parentId) => {
        return Object.keys(sousChapitre).map((key, index) => (
            <div key={index} className="card mt-2">
                <div className="card-header">
                    <span>{key}</span>
                    <button className="btn btn-danger btn-sm mt-2" onClick={() => handleRemoveItem(sousChapitre, key)}>X</button>
                </div>
                <div className="card-body">
                    {renderParagraphe(sousChapitre[key], `${parentId}_${index}`)}
                </div>
            </div>
        ));
    };

    const renderChapitre = () => {
        return Object.keys(surveyStructure).map((key, index) => (
            <div key={index} className="card mt-3">
                <div className="card-header">
                    <span>{key}</span>
                    <button className="btn btn-danger btn-sm mt-2" onClick={() => handleRemoveItem(surveyStructure, key)}>X</button>
                </div>
                <div className="card-body">
                    {renderSousChapitre(surveyStructure[key], `chapitre_${index}`)}
                </div>
            </div>
        ));
    };

    return (
        <div className="container">
            <h1>Survey for Audit {id} - Self Count: {selfCount}</h1>
            <h2>Rendering {selfCountNumber} Tab(s)</h2>
            {surveyStructure ? (
                Array.from({ length: selfCountNumber }).map((_, index) => (
                    <div key={index}>
                        <h3>Tab {index + 1}</h3>
                        {renderChapitre()}
                    </div>
                ))
            ) : (
                <p>Loading survey structure...</p>
            )}

            <button className="btn btn-primary mt-4" onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default SurveyTabs;
