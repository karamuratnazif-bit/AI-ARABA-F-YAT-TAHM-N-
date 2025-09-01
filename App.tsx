import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import CarInputForm from './components/CarInputForm';
import PriceDisplay from './components/PriceDisplay';
import ErrorAlert from './components/ErrorAlert';
import { getCarPriceEstimate, generateCarImage, getCarRecommendation } from './services/geminiService';
import { CarPriceEstimate, RecommendationResult } from './types';
import ExamplePrompts from './components/ExamplePrompts';
import LoadingIndicator from './components/LoadingIndicator';
import GeneratedImage from './components/GeneratedImage';
import ModeSwitcher from './components/ModeSwitcher';
import BudgetInputForm from './components/BudgetInputForm';
import RecommendationDisplay from './components/RecommendationDisplay';


type AppMode = 'estimate' | 'recommend';

const App: React.FC = () => {
    const [mode, setMode] = useState<AppMode>('estimate');
    const [carModel, setCarModel] = useState<string>('');
    const [budget, setBudget] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [estimate, setEstimate] = useState<CarPriceEstimate | null>(null);
    const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
    const [carImageUrl, setCarImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const resetState = () => {
        setError(null);
        setEstimate(null);
        setRecommendation(null);
        setCarImageUrl(null);
    }

    const handleModeChange = (newMode: AppMode) => {
        setMode(newMode);
        resetState();
    };

    const performEstimation = useCallback(async (model: string) => {
        if (!model.trim()) {
            setError("Lütfen bir araba modeli girin.");
            return;
        }
        setIsLoading(true);
        resetState();
        try {
            const [priceResult, imageUrlResult] = await Promise.all([
                getCarPriceEstimate(model),
                generateCarImage(model, 'side')
            ]);
            setEstimate(priceResult);
            if(imageUrlResult) setCarImageUrl(imageUrlResult);
        } catch (err: any) {
            setError(err.message || "Bilinmeyen bir hata oluştu.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const performRecommendation = useCallback(async (budgetInput: string) => {
        const budgetValue = parseInt(budgetInput, 10);
        if (isNaN(budgetValue) || budgetValue <= 0) {
            setError("Lütfen geçerli bir bütçe girin.");
            return;
        }
        setIsLoading(true);
        resetState();
        try {
            const recommendationResult = await getCarRecommendation(budgetValue);
            const [frontImage, sideImage] = await Promise.all([
                generateCarImage(recommendationResult.model, 'front'),
                generateCarImage(recommendationResult.model, 'side')
            ]);
            setRecommendation({
                ...recommendationResult,
                frontImageUrl: frontImage,
                sideImageUrl: sideImage,
            });
        } catch (err: any) {
            setError(err.message || "Bilinmeyen bir hata oluştu.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleEstimateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        performEstimation(carModel);
    };

    const handleRecommendationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        performRecommendation(budget);
    };
    
    const handleExampleClick = (model: string) => {
        setCarModel(model);
        performEstimation(model);
    };

    const WelcomeMessage: React.FC = () => (
        <div className="text-center mt-12 text-gray-300/70 animate-fade-in">
            <p className="text-lg">Türkiye'nin otomobil piyasası uzmanı yapay zekaya hoş geldiniz.</p>
            <p>Yukarıdan bir mod seçerek başlayın.</p>
        </div>
    );


    return (
        <div className="min-h-screen font-sans p-4 flex items-center justify-center">
            <div className="container mx-auto max-w-4xl w-full">
                <Header />
                <main className="mt-8 md:mt-12 p-4 md:p-8 bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                    <ModeSwitcher currentMode={mode} setMode={handleModeChange} />

                    {mode === 'estimate' ? (
                        <>
                            <CarInputForm
                                carModel={carModel}
                                setCarModel={setCarModel}
                                onSubmit={handleEstimateSubmit}
                                isLoading={isLoading}
                            />
                            <ExamplePrompts onSelect={handleExampleClick} disabled={isLoading} />
                        </>
                    ) : (
                        <BudgetInputForm
                            budget={budget}
                            setBudget={setBudget}
                            onSubmit={handleRecommendationSubmit}
                            isLoading={isLoading}
                        />
                    )}
                    
                    <div className="mt-8 min-h-[400px] transition-all duration-300">
                        {isLoading && <LoadingIndicator />}
                        {error && <ErrorAlert message={error} />}

                        {mode === 'estimate' && estimate && (
                            <div className="space-y-8">
                                <PriceDisplay estimate={estimate} />
                                {carImageUrl && <GeneratedImage imageUrl={carImageUrl} carModel={estimate.model} />}
                            </div>
                        )}
                        
                        {mode === 'recommend' && recommendation && (
                            <RecommendationDisplay result={recommendation} />
                        )}

                        {!isLoading && !error && !estimate && !recommendation && <WelcomeMessage />}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
