import React from 'react';
import { RecommendationResult } from '../types';

interface RecommendationDisplayProps {
    result: RecommendationResult;
}

const ImageContainer: React.FC<{ imageUrl: string, altText: string, title: string }> = ({ imageUrl, altText, title }) => (
    <div className="w-full">
        <div className="aspect-video bg-gray-900/50 rounded-2xl overflow-hidden shadow-lg border border-white/10">
            {imageUrl ? (
                <img 
                    src={imageUrl} 
                    alt={altText}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">Görsel Yüklenemedi</div>
            )}
        </div>
        <p className="mt-2 text-center text-sm text-gray-400">{title}</p>
    </div>
);


const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({ result }) => {
    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl animate-fade-in space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-center text-sky-300 mb-1">{result.model}</h2>
                <p className="text-center text-gray-400 mb-6">Bütçenize Göre AI Tarafından Önerilen Araç</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageContainer imageUrl={result.frontImageUrl} altText={`${result.model} önden görünüm`} title="Önden Görünüm"/>
                <ImageContainer imageUrl={result.sideImageUrl} altText={`${result.model} yandan görünüm`} title="Yandan Görünüm"/>
            </div>

            <div className="pt-6 border-t border-white/10">
                <h3 className="text-lg font-semibold text-teal-300 mb-2">Piyasa Değerlendirmesi</h3>
                <p className="text-gray-300 leading-relaxed text-justify">{result.reasoning}</p>
            </div>
            
            <p className="mt-4 text-xs text-center text-gray-500">
                *Bu tavsiye ve görseller yapay zeka tarafından Türkiye'nin 2025-2026 ekonomik beklentileri baz alınarak üretilmiştir ve yalnızca bilgilendirme amaçlıdır.
            </p>
        </div>
    );
};

export default RecommendationDisplay;