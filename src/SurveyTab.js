import React, { useState } from 'react';
import Chapitre from '../Archive/Chapitre'; // You'll create this next

function SurveyTab() {
    const [chapitres, setChapitres] = useState([]);

    const addChapitre = () => {
        setChapitres([...chapitres, { id: Date.now(), title: '', sousChapitres: [] }]);
    };

    const removeChapitre = (chapitreId) => {
        setChapitres(chapitres.filter(c => c.id !== chapitreId));
    };

    const updateChapitreTitle = (chapitreId, newTitle) => {
        setChapitres(chapitres.map(c => c.id === chapitreId ? { ...c, title: newTitle } : c));
    };

    return (
        <div className="container">
            <button onClick={addChapitre} className="btn btn-primary mt-3">Add Chapitre</button>
            {chapitres.map((chapitre) => (
                <Chapitre
                    key={chapitre.id}
                    chapitre={chapitre}
                    removeChapitre={removeChapitre}
                    updateChapitreTitle={updateChapitreTitle}
                />
            ))}
        </div>
    );
}

export default SurveyTab;
