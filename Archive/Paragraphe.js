import React, { useState } from 'react';
import SousParagraphe from './SousParagraphe'; // The final component in the hierarchy

function Paragraphe({ paragraphe, removeParagraphe, updateParagrapheTitle }) {
    const [sousParagraphes, setSousParagraphes] = useState([]);

    const addSousParagraphe = () => {
        setSousParagraphes([...sousParagraphes, { id: Date.now(), title: '', questions: [] }]);
    };

    const removeSousParagraphe = (sousParagrapheId) => {
        setSousParagraphes(sousParagraphes.filter(sp => sp.id !== sousParagrapheId));
    };

    const updateSousParagrapheTitle = (sousParagrapheId, newTitle) => {
        setSousParagraphes(sousParagraphes.map(sp => sp.id === sousParagrapheId ? { ...sp, title: newTitle } : sp));
    };

    return (
        <div className="card mt-2">
            <div className="card-header">
                <input
                    type="text"
                    value={paragraphe.title}
                    onChange={(e) => updateParagrapheTitle(paragraphe.id, e.target.value)}
                    placeholder="Paragraphe Title"
                    className="form-control"
                />
                <button onClick={() => removeParagraphe(paragraphe.id)} className="btn btn-danger mt-2">Remove Paragraphe</button>
                <button onClick={addSousParagraphe} className="btn btn-secondary mt-2">Add Sous-Paragraphe</button>
            </div>
            <div className="card-body">
                {sousParagraphes.map((sp) => (
                    <SousParagraphe
                        key={sp.id}
                        sousParagraphe={sp}
                        removeSousParagraphe={removeSousParagraphe}
                        updateSousParagrapheTitle={updateSousParagrapheTitle}
                    />
                ))}
            </div>
        </div>
    );
}

export default Paragraphe;
