import React from 'react';
import { CarPriceEstimate } from '../types';

interface PriceDisplayProps {
    estimate: CarPriceEstimate;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const PriceDisplay: React.FC<PriceDisplayProps> = ({ estimate }) => {
    return (
        <div className="w-full max-w-3xl mx-auto p-6 bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-bold text-center text-sky-300 mb-1">{estimate.model}</h2>
            <p className="text-center text-gray-400 mb-6">İçin 2025-2026 Yılı Fiyat Projeksiyonu</p>
            
            <div className="flex flex-col md:flex-row justify-around items-center gap-4 md:gap-8 mb-6 p-4 bg-black/20 rounded-xl">
                <div className="text-center">
                    <p className="text-lg text-gray-400 tracking-wider">EN DÜŞÜK</p>
                    <p className="text-4xl font-extrabold text-green-400 drop-shadow-lg">{formatCurrency(estimate.minPrice)}</p>
                </div>
                <div className="text-5xl font-thin text-gray-600 hidden md:block">~</div>
                <div className="text-center">
                    <p className="text-lg text-gray-400 tracking-wider">EN YÜKSEK</p>
                    <p className="text-4xl font-extrabold text-orange-400 drop-shadow-lg">{formatCurrency(estimate.maxPrice)}</p>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-lg font-semibold text-teal-300 mb-2">Piyasa Değerlendirmesi</h3>
                <p className="text-gray-300 leading-relaxed text-justify">{estimate.explanation}</p>
            </div>
            
            <p className="mt-8 text-xs text-center text-gray-500">
                *Bu projeksiyonlar yapay zeka tarafından Türkiye'nin 2025-2026 ekonomik beklentileri baz alınarak üretilmiştir ve yalnızca bilgilendirme amaçlıdır.
            </p>
        </div>
    );
};

export default PriceDisplay;