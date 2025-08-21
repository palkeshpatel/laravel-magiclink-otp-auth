import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MagicLinkInvitation from './MagicLinkInvitation';
import MagicLinkVerification from './MagicLinkVerification';
import UserProfileSetup from '../UserProfileSetup';
import WellnessInterests from '../WellnessInterests';
import WellbeingPillars from '../WellbeingPillars';

function MagicLinkFlow() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Routes>
                <Route path="/" element={<MagicLinkInvitation />} />
                <Route path="/verification" element={<MagicLinkVerification />} />
                <Route path="/profile-setup" element={<UserProfileSetup />} />
                <Route path="/wellness-interests" element={<WellnessInterests />} />
                <Route path="/wellbeing-pillars" element={<WellbeingPillars />} />
            </Routes>
        </div>
    );
}

export default MagicLinkFlow;
