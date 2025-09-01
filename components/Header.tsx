import React from 'react';

const CarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 003.375-3.375h1.5a1.125 1.125 0 011.125 1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375m17.25 4.5v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 00-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h1.5m-12.375-3.375H9.75M12 15.75h.008v.008H12v-.008z" />
    </svg>
);


const Header: React.FC = () => {
    return (
        <header className="text-center p-4">
            <div className="flex items-center justify-center gap-4 mb-2">
                <CarIcon />
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400 drop-shadow-lg">
                    AI Araba Değeri
                </h1>
            </div>
            <p className="text-md md:text-lg text-gray-300/80">
                Araba modelini yazın, 2025-2026 yılı için tahmini fiyat aralığını anında öğrenin.
            </p>
        </header>
    );
};

export default Header;