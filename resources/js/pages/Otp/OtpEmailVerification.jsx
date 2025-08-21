import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OtpEmailVerification() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        workEmail: '',
        companyName: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const isFormValid = () => {
        return formData.firstName && formData.lastName && formData.workEmail && formData.companyName;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // First verify email exists
            const verifyResponse = await axios.get(`/api/verify-email?email=${encodeURIComponent(formData.workEmail)}`);

            if (verifyResponse.data.success) {
                // Then send OTP
                const otpResponse = await axios.get(`/api/send-otp?email=${encodeURIComponent(formData.workEmail)}`);

                if (otpResponse.data.success) {
                    // Navigate to OTP input page
                    navigate('/otp/otp-input', {
                        state: {
                            email: formData.workEmail,
                            user: verifyResponse.data.data.user
                        }
                    });
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 opacity-30"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-orange-100/20 to-transparent"></div>

            {/* Background Illustrations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-20 left-10 opacity-20">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 45C15 45 20 40 25 40C30 40 35 45 35 45" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M20 35C20 35 25 30 30 30C35 30 40 35 40 35" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="30" cy="25" r="8" stroke="#f97316" strokeWidth="2" fill="none"/>
                    </svg>
                </div>
                <div className="absolute bottom-16 right-10 opacity-20">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="15" y="20" width="20" height="15" stroke="#fbbf24" strokeWidth="2" fill="none"/>
                        <path d="M15 20L25 15L35 20" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="25" cy="30" r="2" fill="#f97316"/>
                    </svg>
                </div>
            </div>

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
                <div className="w-full max-w-md">
                    {/* White Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 relative">
                        {/* Card Background Illustrations */}
                        <div className="absolute bottom-4 left-4 opacity-10">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 30C10 30 15 25 20 25C25 25 30 30 30 30" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
                                <circle cx="20" cy="20" r="6" stroke="#f97316" strokeWidth="2" fill="none"/>
                            </svg>
                        </div>
                        <div className="absolute bottom-4 right-4 opacity-10">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="10" y="15" width="20" height="12" stroke="#fbbf24" strokeWidth="2" fill="none"/>
                                <path d="M10 15L20 10L30 15" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>

                        {/* Title */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Login Credentials
                            </h2>
                        </div>

                        {/* Form */}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                        First name
                                    </label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        autoComplete="given-name"
                                        required
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                        placeholder="Enter first name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Last name
                                    </label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        autoComplete="family-name"
                                        required
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                        placeholder="Enter last name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="workEmail" className="block text-sm font-medium text-gray-700 mb-2">
                                        Work email
                                    </label>
                                    <input
                                        id="workEmail"
                                        name="workEmail"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={formData.workEmail}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                        placeholder="Enter work email"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Company name
                                    </label>
                                    <input
                                        id="companyName"
                                        name="companyName"
                                        type="text"
                                        autoComplete="organization"
                                        required
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                        placeholder="Enter company name"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || !isFormValid()}
                                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending OTP...
                                    </div>
                                ) : (
                                    'Next'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OtpEmailVerification;
