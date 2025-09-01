import React from 'react';

interface ExamplePromptsProps {
    onSelect: (model: string) => void;
    disabled: boolean;
}

const EXAMPLES = [
    "2023 Tesla Model Y",
    "2020 Volkswagen Passat 1.5 TSI",
    "2018 Ford Focus 1.6 TDCi Trend X",
    "2022 Fiat Egea 1.4 Fire Easy",
];

const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onSelect, disabled }) => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <p className="text-sm text-gray-400 mr-2">Örnekler:</p>
            {EXAMPLES.map((example) => (
                <button
                    key={example}
                    onClick={() => onSelect(example)}
                    disabled={disabled}
                    className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full text-gray-300 hover:bg-white/10 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`Select example: ${example}`}
                >
                    {example}
                </button>
            ))}
        </div>
    );
};

export default ExamplePrompts;