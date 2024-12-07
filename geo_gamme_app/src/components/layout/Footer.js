import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full py-4 mt-auto bg-white shadow-sm">
            <div className="flex items-center justify-center space-x-1 text-gray-600">
                <span>Made with</span>
                <Heart
                    size={16}
                    className="text-red-500 hover:scale-125 transition-transform duration-300 fill-current"
                    aria-label="love"
                />
                <span>by</span>
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