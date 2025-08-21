import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Success() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, message } = location.state || {};

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-green-600 rounded-full flex items-center justify-center">
                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Welcome aboard!
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {message || 'Your registration has been completed successfully!'}
                    </p>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Welcome, {user?.first_name} {user?.last_name}!
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Your account has been successfully created and you're now ready to use our platform.
                        </p>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>Email:</strong> {user?.email}</p>
                            {user?.contact_number && (
                                <p><strong>Contact:</strong> {user?.contact_number}</p>
                            )}
                            {user?.date_of_birth && (
                                <p><strong>Date of Birth:</strong> {new Date(user?.date_of_birth).toLocaleDateString()}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Back to Home
                    </button>
                    
                    <div className="text-center">
                        <p className="text-xs text-gray-500">
                            You can now log in using your email and password.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Success;
