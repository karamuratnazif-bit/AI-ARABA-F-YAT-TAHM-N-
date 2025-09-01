import React from 'react';

interface GeneratedImageProps {
    imageUrl: string;
    carModel: string;
}

const GeneratedImage: React.FC<GeneratedImageProps> = ({ imageUrl, carModel }) => {
    return (
        <div className="w-full mx-auto mt-8 animate-fade-in">
            <h3 className="text-lg font-semibold text-center text-teal-300 mb-4">
                {carModel} için Yapay Zeka Tarafından Oluşturulan Görsel
            </h3>
            <div className="aspect-video bg-gray-900/50 rounded-2xl overflow-hidden shadow-lg border border-white/10">
                <img 
                    src={imageUrl} 
                    alt={`AI generated image of ${carModel}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>
             <p className="mt-4 text-xs text-center text-gray-500">
                *Bu görsel yapay zeka tarafından oluşturulmuştur ve temsilidir.
            </p>
        </div>
    );
};

export default GeneratedImage;