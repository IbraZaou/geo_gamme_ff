import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full py-4 mt-auto bg-white shadow-sm">
            <div className="flex items-center justify-center space-x-1 text-gray-600">
                <span>Made by </span>
                <a
                    href="https://github.com/IbraZaou"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-500 hover:text-blue-600 transition-colors duration-200"
                >
                    IbraDev
                </a>
            </div>
        </footer>
    );
};

export default Footer;