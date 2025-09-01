import React from 'react';

const LoadingIndicator: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center text-gray-300 pt-16 animate-fade-in">
             <svg className="w-16 h-16 mb-4 animate-spin text-blue-400" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="5" fill="none" strokeDasharray="283" strokeDashoffset="212" strokeLinecap="round" />
            </svg>
            <h3 className="text-2xl font-semibold text-white">Analiz Ediliyor...</h3>
            <p className="mt-2 text-gray-400">Yapay zeka, 2025-2026 piyasa koşullarını temel alarak gerçekçi bir analiz yapıyor.</p>
        </div>
    );
};

export default LoadingIndicator;