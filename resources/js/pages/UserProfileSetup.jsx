import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserProfileSetup() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
        dob: '',
        contact_number: '',
        confirmation_flag: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Validate password requirements
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            setLoading(false);
            return;
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/user/profile', {
                user_id: user.id,
                password: formData.password,
                dob: formData.dob,
                contact_number: formData.contact_number,
                confirmation_flag: formData.confirmation_flag
            });

            if (response.data.success) {
                // Navigate to wellness interests
                navigate('/magic-link/wellness-interests', { 
                    state: { user: response.data.data.user } 
                });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-green-600 rounded-full flex items-center justify-center">
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Complete Your Profile
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Welcome, {user.first_name}! Let's set up your account.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your password"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Must be at least 8 characters with uppercase, lowercase, and number
                            </p>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm your password"
                            />
                        </div>

                        <div>
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                                Date of Birth
                            </label>
                            <input
                                id="dob"
                                name="dob"
                                type="date"
                                required
                                value={formData.dob}
                                onChange={handleInputChange}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700">
                                Contact Number
                            </label>
                            <input
                                id="contact_number"
                                name="contact_number"
                                type="tel"
                                required
                                value={formData.contact_number}
                                onChange={handleInputChange}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your contact number"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                id="confirmation_flag"
                                name="confirmation_flag"
                                type="checkbox"
                                required
                                checked={formData.confirmation_flag}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="confirmation_flag" className="ml-2 block text-sm text-gray-900">
                                I confirm that all information provided is accurate
                            </label>
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="text-sm text-red-700">{error}</div>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            {loading ? 'Saving Profile...' : 'Save Profile & Continue'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserProfileSetup;
