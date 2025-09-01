import React from 'react';

interface ErrorAlertProps {
    message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="w-full max-w-2xl mx-auto mt-8 p-4 bg-red-900/40 backdrop-blur-sm border border-red-600 text-red-100 rounded-lg shadow-lg animate-fade-in" role="alert">
            <div className="flex">
                <div className="py-1">
                    <svg className="fill-current h-6 w-6 text-red-300 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-5a1 1 0 012 0v2a1 1 0 01-2 0v-2zm0-6a1 1 0 012 0v4a1 1 0 01-2 0V7z"/>
                    </svg>
                </div>
                <div>
                    <p className="font-bold">Bir Hata Oluştu</p>
                    <p className="text-sm">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default ErrorAlert;