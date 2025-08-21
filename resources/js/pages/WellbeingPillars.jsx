import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function WellbeingPillars() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;

    const [wellbeingPillars, setWellbeingPillars] = useState([]);
    const [selectedPillars, setSelectedPillars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchWellbeingPillars();
    }, []);

    const fetchWellbeingPillars = async () => {
        try {
            const response = await axios.get('/api/wellbeing-pillars');
            if (response.data.success) {
                setWellbeingPillars(response.data.data.wellbeing_pillars);
            }
        } catch (err) {
            setError('Failed to load wellbeing pillars');
        } finally {
            setLoading(false);
        }
    };

    const handlePillarToggle = (pillarId) => {
        setSelectedPillars(prev => {
            if (prev.includes(pillarId)) {
                return prev.filter(id => id !== pillarId);
            } else {
                // Only allow 3 selections
                if (prev.length >= 3) {
                    return prev;
                }
                return [...prev, pillarId];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (selectedPillars.length !== 3) {
            setError('Please select exactly 3 wellbeing pillars');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const response = await axios.post('/api/wellbeing-pillars', {
                user_id: user.id,
                wellbeing_pillar_ids: selectedPillars
            });

            if (response.data.success) {
                // Registration complete - redirect to success page
                navigate('/success', { 
                    state: { 
                        user: user,
                        message: 'Registration completed successfully!' 
                    } 
                });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-red-600">No user data found. Please start over.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading wellbeing pillars...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <div className="mx-auto h-12 w-12 bg-orange-600 rounded-full flex items-center justify-center">
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Select Your Wellbeing Pillars
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Choose exactly 3 pillars that are most important to your wellbeing
                    </p>
                    <div className="mt-4 text-sm text-orange-600 font-medium">
                        {selectedPillars.length}/3 selected
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {wellbeingPillars.map((pillar) => (
                            <div
                                key={pillar.id}
                                className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                    selectedPillars.includes(pillar.id)
                                        ? 'border-orange-500 bg-orange-50 shadow-md'
                                        : selectedPillars.length >= 3 && !selectedPillars.includes(pillar.id)
                                        ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                                        : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-sm'
                                }`}
                                onClick={() => handlePillarToggle(pillar.id)}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                        selectedPillars.includes(pillar.id)
                                            ? 'border-orange-500 bg-orange-500'
                                            : 'border-gray-300'
                                    }`}>
                                        {selectedPillars.includes(pillar.id) && (
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">
                                            {pillar.name}
                                        </h3>
                                        {pillar.description && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                {pillar.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-4 mb-6">
                            <div className="text-sm text-red-700">{error}</div>
                        </div>
                    )}

                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() => navigate('/magic-link/wellness-interests', { state: { user } })}
                            className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            Back
                        </button>

                        <button
                            type="submit"
                            disabled={submitting || selectedPillars.length !== 3}
                            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Completing Registration...
                                </div>
                            ) : (
                                'Complete Registration'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WellbeingPillars;
