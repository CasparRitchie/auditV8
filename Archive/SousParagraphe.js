import React, { useState } from 'react';

function SousParagraphe({ sousParagraphe, removeSousParagraphe, updateSousParagrapheTitle }) {
    const [questions, setQuestions] = useState([]);

    const addQuestion = () => {
        setQuestions([...questions, { id: Date.now(), text: '' }]);
    };

    const removeQuestion = (questionId) => {
        setQuestions(questions.filter(q => q.id !== questionId));
    };

    const updateQuestionText = (questionId, newText) => {
        setQuestions(questions.map(q => q.id === questionId ? { ...q, text: newText } : q));
    };

    return (
        <div className="card mt-2">
            <div className="card-header">
                <input
                    type="text"
                    value={sousParagraphe.title}
                    onChange={(e) => updateSousParagrapheTitle(sousParagraphe.id, e.target.value)}
                    placeholder="Sous-Paragraphe Title"
                    className="form-control"
                />
                <button onClick={() => removeSousParagraphe(sousParagraphe.id)} className="btn btn-danger mt-2">Remove Sous-Paragraphe</button>
                <button onClick={addQuestion} className="btn btn-secondary mt-2">Add Question</button>
            </div>
            <div className="card-body">
                {questions.map((question) => (
                    <div key={question.id} className="input-group mt-2">
                        <input
                            type="text"
                            value={question.text}
                            onChange={(e) => updateQuestionText(question.id, e.target.value)}
                            placeholder="Question Text"
                            className="form-control"
                        />
                        <button onClick={() => removeQuestion(question.id)} className="btn btn-danger">Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SousParagraphe;
