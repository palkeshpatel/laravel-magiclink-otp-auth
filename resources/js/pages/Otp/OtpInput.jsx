import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function OtpInput() {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, user } = location.state || {};

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendTimer, setResendTimer] = useState(0);

    useEffect(() => {
        let timer;
        if (resendTimer > 0) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendTimer]);

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return; // Only allow single digit

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');
        if (otpString.length !== 6) return;

        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`/api/verify-otp?email=${encodeURIComponent(email)}&otp=${otpString}`);

            if (response.data.success) {
                const verifiedUser = response.data.data.user;

                // Check if user needs to complete profile
                if (!verifiedUser.profile_completed) {
                    navigate('/otp/profile-setup', {
                        state: { user: verifiedUser }
                    });
                } else if (!verifiedUser.registration_completed) {
                    navigate('/otp/wellness-interests', {
                        state: { user: verifiedUser }
                    });
                } else {
                    // Registration complete - redirect to dashboard or success page
                    navigate('/success', {
                        state: { user: verifiedUser }
                    });
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (resendTimer > 0) return;

        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`/api/send-otp?email=${encodeURIComponent(email)}`);

            if (response.data.success) {
                setOtp(['', '', '', '', '', '']);
                setError('');
                setResendTimer(180); // 3 minutes
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!email || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-red-600">No email or user data found. Please start over.</p>
                    <button
                        onClick={() => navigate('/otp')}
                        className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md"
                    >
                        Back to Email Verification
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 opacity-30"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-orange-100/20 to-transparent"></div>
            
            {/* Status Bar */}
            <div className="relative z-10 flex justify-between items-center px-4 py-2 text-sm">
                <span className="text-gray-900 font-medium">9:41</span>
                <div className="flex items-center space-x-1">
                    <div className="w-6 h-3 bg-gray-900 rounded-sm"></div>
                    <div className="w-1 h-3 bg-gray-900 rounded-sm"></div>
                </div>
            </div>

            {/* Header */}
            <div className="relative z-10 flex justify-between items-center px-4 py-4">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        woliba
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-1"></span>
                    </h1>
                </div>
                <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-1 shadow-sm">
                    <span className="text-2xl">🇺🇸</span>
                    <span className="text-sm font-medium text-gray-700">En</span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 min-h-[calc(100vh-120px)]">
                <div className="w-full max-w-md space-y-8">
                    {/* Title */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Email verification now
                        </h2>
                        <p className="text-sm text-gray-600">
                            We've sent a 6-digit OTP to your email and please enter it below to confirm.
                        </p>
                    </div>

                    {/* OTP Input */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="flex justify-center space-x-3">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                        placeholder=""
                                    />
                                ))}
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || otp.join('').length !== 6}
                            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifying...
                                </div>
                            ) : (
                                'Verify'
                            )}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={resendTimer > 0 || loading}
                                className="text-sm text-orange-600 hover:text-orange-500 disabled:text-gray-400 disabled:cursor-not-allowed"
                            >
                                {resendTimer > 0 
                                    ? `Resend OTP in ${Math.floor(resendTimer / 60)}:${(resendTimer % 60).toString().padStart(2, '0')}m`
                                    : 'Resend OTP'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OtpInput;
