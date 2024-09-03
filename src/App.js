import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Homepage';
import CreateAudit from './CreateAudit';
import ListAudits from './ListAudits';
import ViewAudit from './ViewAudit';
import Survey from './Survey';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/list_audits" element={<ListAudits/>} />
                <Route path="/create-audit" element={<CreateAudit />} />
                <Route path="/view_audit/:id" element={<ViewAudit />} /> {/* Add this route */}
                <Route path="/survey/:id" element={<Survey />} /> {/* Ensure this route is correct */}
            </Routes>
        </Router>
    );
}

export default App;
