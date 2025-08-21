import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function WellnessInterests() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;

    const [wellnessInterests, setWellnessInterests] = useState([]);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchWellnessInterests();
    }, []);

    const fetchWellnessInterests = async () => {
        try {
            const response = await axios.get('/api/wellness-interests');
            if (response.data.success) {
                setWellnessInterests(response.data.data.wellness_interests);
            }
        } catch (err) {
            setError('Failed to load wellness interests');
        } finally {
            setLoading(false);
        }
    };

    const handleInterestToggle = (interestId) => {
        setSelectedInterests(prev => {
            if (prev.includes(interestId)) {
                return prev.filter(id => id !== interestId);
            } else {
                return [...prev, interestId];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (selectedInterests.length === 0) {
            setError('Please select at least one wellness interest');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const response = await axios.post('/api/wellness-interests', {
                user_id: user.id,
                wellness_interest_ids: selectedInterests
            });

            if (response.data.success) {
                // Navigate to wellbeing pillars
                navigate('/magic-link/wellbeing-pillars', { 
                    state: { user: user } 
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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading wellness interests...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <div className="mx-auto h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center">
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Select Your Wellness Interests
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Choose the wellness activities that interest you most
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {wellnessInterests.map((interest) => (
                            <div
                                key={interest.id}
                                className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                    selectedInterests.includes(interest.id)
                                        ? 'border-purple-500 bg-purple-50 shadow-md'
                                        : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-sm'
                                }`}
                                onClick={() => handleInterestToggle(interest.id)}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                        selectedInterests.includes(interest.id)
                                            ? 'border-purple-500 bg-purple-500'
                                            : 'border-gray-300'
                                    }`}>
                                        {selectedInterests.includes(interest.id) && (
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">
                                            {interest.name}
                                        </h3>
                                        {interest.description && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                {interest.description}
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
                            onClick={() => navigate('/magic-link/profile-setup', { state: { user } })}
                            className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Back
                        </button>

                        <button
                            type="submit"
                            disabled={submitting || selectedInterests.length === 0}
                            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </div>
                            ) : (
                                `Continue (${selectedInterests.length} selected)`
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WellnessInterests;
