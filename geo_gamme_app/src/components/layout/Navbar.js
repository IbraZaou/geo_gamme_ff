import React, { useState } from 'react';
import { Menu, X, ChevronDown, Search, Sun, Moon } from 'lucide-react';
import Logo from '../../assets/logoDuq.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const navigation = [
        { name: 'Accueil', href: '/' },
        { name: 'Pièces', href: '/pieces' },
        {
            name: 'Catégories',
            href: '#',
            submenu: ['RHS', 'LHS', 'US', 'LS', 'SPLICE']
        },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <div className="flex items-center space-x-2">
                            {/* Logo placeholder - replace with your actual logo */}
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                                <img src={Logo} />
                            </div>
                            <span className="text-xl font-bold text-gray-800">Géo 3D</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">

                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <div className="px-4 py-2">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>

                    {navigation.map((item) => (
                        <div key={item.name}>
                            <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 flex items-center justify-between">
                                <span>{item.name}</span>
                                {item.submenu && <ChevronDown size={16} />}
                            </button>

                            {item.submenu && (
                                <div className="pl-8 py-1 bg-gray-50">
                                    {item.submenu.map((subitem) => (
                                        <a
                                            key={subitem}
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            {subitem}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;