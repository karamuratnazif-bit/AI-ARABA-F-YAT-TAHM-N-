import React from 'react';

type AppMode = 'estimate' | 'recommend';

interface ModeSwitcherProps {
    currentMode: AppMode;
    setMode: (mode: AppMode) => void;
}

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ currentMode, setMode }) => {
    const baseClasses = "w-1/2 py-2.5 text-sm md:text-base font-bold rounded-full focus:outline-none transition-all duration-300";
    const activeClasses = "bg-sky-500 text-white shadow-lg";
    const inactiveClasses = "bg-transparent text-gray-300 hover:bg-white/5";

    return (
        <div className="w-full max-w-md mx-auto mb-8 flex items-center p-1.5 bg-black/30 border border-white/10 rounded-full">
            <button
                onClick={() => setMode('estimate')}
                className={`${baseClasses} ${currentMode === 'estimate' ? activeClasses : inactiveClasses}`}
                aria-pressed={currentMode === 'estimate'}
            >
                Değer Tahmini
            </button>
            <button
                onClick={() => setMode('recommend')}
                className={`${baseClasses} ${currentMode === 'recommend' ? activeClasses : inactiveClasses}`}
                aria-pressed={currentMode === 'recommend'}
            >
                Fiyata Göre Bul
            </button>
        </div>
    );
};

export default ModeSwitcher;
