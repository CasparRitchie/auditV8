import React, { useState } from 'react';
import Paragraphe from './Paragraphe'; // This will be the next component

function SousChapitre({ sousChapitre, removeSousChapitre, updateSousChapitreTitle }) {
    const [paragraphes, setParagraphes] = useState([]);

    const addParagraphe = () => {
        setParagraphes([...paragraphes, { id: Date.now(), title: '', sousParagraphes: [] }]);
    };

    const removeParagraphe = (paragrapheId) => {
        setParagraphes(paragraphes.filter(p => p.id !== paragrapheId));
    };

    const updateParagrapheTitle = (paragrapheId, newTitle) => {
        setParagraphes(paragraphes.map(p => p.id === paragrapheId ? { ...p, title: newTitle } : p));
    };

    return (
        <div className="card mt-2">
            <div className="card-header">
                <input
                    type="text"
                    value={sousChapitre.title}
                    onChange={(e) => updateSousChapitreTitle(sousChapitre.id, e.target.value)}
                    placeholder="Sous-Chapitre Title"
                    className="form-control"
                />
                <button onClick={() => removeSousChapitre(sousChapitre.id)} className="btn btn-danger mt-2">Remove Sous-Chapitre</button>
                <button onClick={addParagraphe} className="btn btn-secondary mt-2">Add Paragraphe</button>
            </div>
            <div className="card-body">
                {paragraphes.map((p) => (
                    <Paragraphe
                        key={p.id}
                        paragraphe={p}
                        removeParagraphe={removeParagraphe}
                        updateParagrapheTitle={updateParagrapheTitle}
                    />
                ))}
            </div>
        </div>
    );
}

export default SousChapitre;
