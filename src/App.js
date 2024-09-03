import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Homepage';
import CreateAudit from './CreateAudit';
import ListAudits from './ListAudits';
import ViewAudit from './ViewAudit';
import Survey from './Survey';
import SurveyTabs from './SurveyTabs'; // Import the new component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/list_audits" element={<ListAudits />} />
                <Route path="/create-audit" element={<CreateAudit />} />
                <Route path="/view_audit/:id" element={<ViewAudit />} />
                <Route path="/survey/:id" element={<Survey />} />
                <Route path="/survey_tabs/:id" element={<SurveyTabs />} /> {/* New Route */}
            </Routes>
        </Router>
    );
}

export default App;
