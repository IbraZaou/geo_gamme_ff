// pages/ErrorPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-20">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-button-gradient-blue-start mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-h2-color mb-4">Not found</h2>
                <button
                    onClick={() => navigate('/')}
                    className="bg-gradient-to-r from-button-gradient-blue-start to-button-gradient-blue-end 
                    px-6 py-3 rounded-md text-black font-semibold hover:opacity-90 transition-all duration-300"
                >
                    Retour
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;