import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [code, setCode] = useState('');
    const [showCode, setShowCode] = useState(false);
    const [error, setError] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const navigate = useNavigate();

    // Dans Login.js, modifiez handleSubmit :
    const handleSubmit = (e) => {
        e.preventDefault();
        if (code === '0901') {
            setError(false);
            onLogin();  // Appeler onLogin au lieu de navigate
        } else {
            setError(true);
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 500);
            setTimeout(() => setCode(''), 200);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                {/* En-tête */}
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Connexion
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Entrez le code secret pour accéder à l'application
                    </p>
                </div>

                {/* Formulaire */}
                <form
                    onSubmit={handleSubmit}
                    className={`mt-8 space-y-6 ${isAnimating ? 'animate-shake' : ''}`}
                >
                    <div className="rounded-md shadow-sm">
                        <div className="relative">
                            <Lock
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <input
                                type={showCode ? "text" : "password"}
                                value={code}
                                onChange={(e) => {
                                    setError(false);
                                    setCode(e.target.value);
                                }}
                                placeholder="Code secret"
                                className={`appearance-none relative block w-full px-12 py-3 border ${error ? 'border-red-300' : 'border-gray-300'
                                    } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowCode(!showCode)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showCode ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            Code incorrect. Veuillez réessayer.
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                            Se connecter
                        </button>
                    </div>
                </form>
            </div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-8px); }
                    75% { transform: translateX(8px); }
                }
                .animate-shake {
                    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
            `}</style>
        </div>
    );
};

export default Login;

