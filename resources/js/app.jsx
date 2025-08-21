import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MagicLinkFlow from './pages/MagicLink/MagicLinkFlow';
import OtpFlow from './pages/Otp/OtpFlow';
import UserProfileSetup from './pages/UserProfileSetup';
import WellnessInterests from './pages/WellnessInterests';
import WellbeingPillars from './pages/WellbeingPillars';
import Success from './pages/Success';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/magic-link/*" element={<MagicLinkFlow />} />
                    <Route path="/otp/*" element={<OtpFlow />} />
                    <Route path="/profile-setup" element={<UserProfileSetup />} />
                    <Route path="/wellness-interests" element={<WellnessInterests />} />
                    <Route path="/wellbeing-pillars" element={<WellbeingPillars />} />
                    <Route path="/success" element={<Success />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
