import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OtpEmailVerification from './OtpEmailVerification';
import OtpInput from './OtpInput';
import UserProfileSetup from '../UserProfileSetup';
import WellnessInterests from '../WellnessInterests';
import WellbeingPillars from '../WellbeingPillars';

function OtpFlow() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Routes>
                <Route path="/" element={<OtpEmailVerification />} />
                <Route path="/otp-input" element={<OtpInput />} />
                <Route path="/profile-setup" element={<UserProfileSetup />} />
                <Route path="/wellness-interests" element={<WellnessInterests />} />
                <Route path="/wellbeing-pillars" element={<WellbeingPillars />} />
            </Routes>
        </div>
    );
}

export default OtpFlow;
