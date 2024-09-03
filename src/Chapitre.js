import React, { useState } from 'react';
import SousChapitre from './SousChapitre'; // Next step will be to create this

function Chapitre({ chapitre, removeChapitre, updateChapitreTitle }) {
    const [sousChapitres, setSousChapitres] = useState([]);

    const addSousChapitre = () => {
        setSousChapitres([...sousChapitres, { id: Date.now(), title: '', paragraphes: [] }]);
    };

    const removeSousChapitre = (sousChapitreId) => {
        setSousChapitres(sousChapitres.filter(sc => sc.id !== sousChapitreId));
    };

    const updateSousChapitreTitle = (sousChapitreId, newTitle) => {
        setSousChapitres(sousChapitres.map(sc => sc.id === sousChapitreId ? { ...sc, title: newTitle } : sc));
    };

    return (
        <div className="card mt-3">
            <div className="card-header">
                <input
                    type="text"
                    value={chapitre.title}
                    onChange={(e) => updateChapitreTitle(chapitre.id, e.target.value)}
                    placeholder="Chapitre Title"
                    className="form-control"
                />
                <button onClick={() => removeChapitre(chapitre.id)} className="btn btn-danger mt-2">Remove Chapitre</button>
                <button onClick={addSousChapitre} className="btn btn-secondary mt-2">Add Sous-Chapitre</button>
            </div>
            <div className="card-body">
                {sousChapitres.map((sc) => (
                    <SousChapitre
                        key={sc.id}
                        sousChapitre={sc}
                        removeSousChapitre={removeSousChapitre}
                        updateSousChapitreTitle={updateSousChapitreTitle}
                    />
                ))}
            </div>
        </div>
    );
}

export default Chapitre;
