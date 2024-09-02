import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Homepage';
import CreateAudit from './CreateAudit';
// Import other components

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/view-audits" element={<div>Page to View Audits</div>} />
                <Route path="/create-audit" element={<CreateAudit />} />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
}

export default App;
