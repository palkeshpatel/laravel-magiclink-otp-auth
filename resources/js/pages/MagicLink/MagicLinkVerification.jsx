import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function MagicLinkVerification() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            const token = location.state?.token || new URLSearchParams(window.location.search).get('token');
            
            if (!token) {
                setError('No magic link token found. Please request a new link.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`/api/magic-link/user?token=${token}`);
                
                if (response.data.success) {
                    setUser(response.data.data.user);
                    
                    // Check if user needs to complete profile
                    if (!response.data.data.user.profile_completed) {
                        navigate('/magic-link/profile-setup', { 
                            state: { user: response.data.data.user } 
                        });
                    } else if (!response.data.data.user.registration_completed) {
                        navigate('/magic-link/wellness-interests', { 
                            state: { user: response.data.data.user } 
                        });
                    } else {
                        // Registration complete - redirect to dashboard or success page
                        navigate('/success', { 
                            state: { user: response.data.data.user } 
                        });
                    }
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Invalid or expired magic link. Please request a new one.');
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [location, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Verifying your magic link...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <div className="mx-auto h-12 w-12 bg-red-600 rounded-full flex items-center justify-center">
                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Verification Failed
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {error}
                        </p>
                    </div>

                    <div className="mt-8 space-y-4">
                        <button
                            onClick={() => navigate('/magic-link')}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Request New Magic Link
                        </button>
                        
                        <button
                            onClick={() => navigate('/')}
                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null; // This should not be reached as we redirect on success
}

export default MagicLinkVerification;
