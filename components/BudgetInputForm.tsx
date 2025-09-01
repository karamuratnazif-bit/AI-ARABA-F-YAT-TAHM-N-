import React from 'react';

interface BudgetInputFormProps {
    budget: string;
    setBudget: (budget: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
}

const BudgetInputForm: React.FC<BudgetInputFormProps> = ({ budget, setBudget, onSubmit, isLoading }) => {
    return (
        <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-3 p-2 bg-black/30 border border-white/10 rounded-full shadow-lg focus-within:ring-2 focus-within:ring-sky-400/50 transition-shadow duration-300">
                <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Bütçenizi girin (Örn: 850000)"
                    className="w-full px-6 py-3 text-lg text-white bg-transparent focus:outline-none placeholder-gray-400 flex-grow"
                    disabled={isLoading}
                    aria-label="Bütçe (TL)"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-sky-500 to-blue-600 rounded-full hover:from-sky-400 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-sky-500/50 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-100"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Aranıyor...
                        </>
                    ) : (
                        "Araba Bul"
                    )}
                </button>
            </div>
        </form>
    );
};

export default BudgetInputForm;
