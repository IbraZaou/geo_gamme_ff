import React, { useState } from 'react';
import { Search, Clipboard, Check, ChevronDown, ChevronUp } from 'lucide-react';
import pieces from '../data/pieces.json';

const Home = () => {
    const [selectedCode, setSelectedCode] = useState('');
    const [expandedPieces, setExpandedPieces] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedLink, setCopiedLink] = useState(null);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const codes = ['RHS', 'LHS', 'US', 'LS', 'SPLICE'];

    const normalizeString = (str) => str.toLowerCase().replace(/[-\s]/g, '');

    const filteredPieces = pieces.filter((piece) => {
        const matchesCode = !selectedCode || piece.CODE === selectedCode;

        // Normalisation de la recherche et de la désignation
        const normalizedSearch = normalizeString(searchQuery);
        const normalizedDesignation = normalizeString(piece["désignation"]);

        // Recherche dans la désignation normalisée
        const matchesSearch = !searchQuery ||
            normalizedDesignation.includes(normalizedSearch);

        return matchesCode && matchesSearch;
    });

    const togglePieceDetails = (pieceId) => {
        setExpandedPieces((prev) => ({
            ...prev,
            [pieceId]: !prev[pieceId],
        }));
    };

    const copyToClipboard = (link) => {
        navigator.clipboard.writeText(link).then(() => {
            setCopiedLink(link);
            setTimeout(() => setCopiedLink(null), 2000);
        });
    };

    const getPlotColor = (color) => {
        const colorCode = color?.toLowerCase();
        switch (colorCode) {
            case 'b':
                return 'bg-blue-400 text-blue-800';
            case 'r':
                return 'bg-red-400 text-red-800';
            case 'v':
                return 'bg-green-400 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Liste des Pièces</h1>

                    <div className="mb-6">
                        <div className={`relative transition-all duration-300 ${isSearchFocused ? 'ring-2 ring-blue-500' : ''
                            }`}>
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Rechercher une pièce"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none shadow-sm hover:border-gray-300 transition-colors duration-200"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                            Astuce: Vous pouvez rechercher sans tirets ni espaces
                        </p>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedCode('')}
                            className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium 
                                ${!selectedCode
                                    ? 'bg-blue-500 text-white shadow-md transform scale-105'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Tous
                        </button>
                        {codes.map((code) => (
                            <button
                                key={code}
                                onClick={() => setSelectedCode(selectedCode === code ? '' : code)}
                                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium 
                                    ${selectedCode === code
                                        ? 'bg-blue-500 text-white shadow-md transform scale-105'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {code}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pieces Grid */}
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
                    {filteredPieces.map((piece, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">{piece["désignation"]}</h3>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                    {piece.CODE}
                                </span>
                            </div>

                            <button
                                onClick={() => togglePieceDetails(index)}
                                className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-300 group"
                            >
                                <span className="font-medium">
                                    {expandedPieces[index] ? 'Masquer les détails' : 'Voir les détails'}
                                </span>
                                {expandedPieces[index] ? (
                                    <ChevronUp className="text-gray-400 group-hover:text-gray-600 transition-colors duration-300" size={20} />
                                ) : (
                                    <ChevronDown className="text-gray-400 group-hover:text-gray-600 transition-colors duration-300" size={20} />
                                )}
                            </button>

                            {expandedPieces[index] && (
                                <div className="mt-4 divide-y divide-gray-100">
                                    <div className="grid grid-cols-2 gap-4 py-3">
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Client</p>
                                            <p className="font-medium text-gray-900">{piece.client}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">PN Client</p>
                                            <p className="font-medium text-gray-900">{piece["PN client"]}</p>
                                        </div>
                                    </div>

                                    <div className="py-3">
                                        <p className="text-sm text-gray-500">Code Article DUQ</p>
                                        <p className="font-medium text-gray-900 mt-1">{piece["code article DUQ"]}</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 py-3">

                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">BDM</p>
                                            <p className="font-medium text-gray-900">{piece.BDM}</p>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Plots</p>
                                            <p className="font-medium text-gray-900">{piece.Plots}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Couleur plots</p>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-3 py-1 h-8 w-8 rounded-full text-sm font-medium ${getPlotColor(piece["Couleur plots"])}`}>
                                                    {[""] || 'Non spécifié'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="py-3">
                                        <p className="text-sm text-gray-500">Lien Gamme</p>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <a
                                                href={piece["Lien gamme"]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-600 font-medium truncate flex-1"
                                            >
                                                {piece["Lien gamme"]}
                                            </a>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    copyToClipboard(piece["Lien gamme"]);
                                                }}
                                                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                                            >
                                                {copiedLink === piece["Lien gamme"] ? (
                                                    <Check className="text-green-500" size={18} />
                                                ) : (
                                                    <Clipboard className="text-gray-400" size={18} />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 py-3">
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">PWK</p>
                                            <p className="font-medium text-gray-900">{piece.PWK}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">MLG</p>
                                            <p className="font-medium text-gray-900">{piece.MLG || 'Non spécifié'}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {filteredPieces.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Aucune pièce trouvée</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;