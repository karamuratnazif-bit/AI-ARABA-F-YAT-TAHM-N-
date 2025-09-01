import { GoogleGenAI, Type } from "@google/genai";
import { CarPriceEstimate, CarRecommendation } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const priceSchema = {
  type: Type.OBJECT,
  properties: {
    minPrice: {
      type: Type.NUMBER,
      description: "Tahmini minimum fiyat (TL). Sayı olarak yazılmalı.",
    },
    maxPrice: {
      type: Type.NUMBER,
      description: "Tahmini maksimum fiyat (TL). Sayı olarak yazılmalı.",
    },
    currency: {
        type: Type.STRING,
        description: "Para birimi, her zaman 'TL' olmalı."
    },
    explanation: {
      type: Type.STRING,
      description: "Bu fiyat aralığının nedenlerini ve 2025-2026 piyasa koşulları öngörülerini açıklayan kısa bir metin.",
    },
    model: {
        type: Type.STRING,
        description: "Tahmin yapılan araba modeli."
    }
  },
  required: ["minPrice", "maxPrice", "currency", "explanation", "model"],
};


const recommendationSchema = {
    type: Type.OBJECT,
    properties: {
        model: {
            type: Type.STRING,
            description: "Önerilen araba modeli (örneğin, '2020 Volkswagen Passat 1.5 TSI Business')."
        },
        reasoning: {
            type: Type.STRING,
            description: "Bu arabanın neden bu bütçe için 2025-2026 yıllarında iyi bir seçim olacağını açıklayan detaylı bir metin. Piyasa durumu, yakıt tüketimi, bakım maliyetleri gibi faktörlere değin."
        }
    },
    required: ["model", "reasoning"],
};


export const getCarPriceEstimate = async (carModel: string): Promise<CarPriceEstimate> => {
  try {
    const prompt = `Sen Türkiye'deki otomobil piyasası konusunda uzman bir yapay zekasın. Sana vereceğim araba modelinin önce GÜNCEL piyasa değerini analiz et. Ardından, 2025-2026 yılları için Türkiye ekonomisindeki olası değişimleri DİKKATLİ ve AŞIRIYA KAÇMAYAN bir şekilde yorumlayarak, aracın gelecekteki fiyat aralığını TL cinsinden tahmin et. Tahminlerin SPEKÜLATİF değil, MAKUL ve GERÇEKÇİ olmalı. Mevcut fiyatı 2-3 katına çıkaran abartılı tahminlerden kaçın. Cevabını sadece ve sadece belirttiğim JSON formatında ver. Model: "${carModel}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: priceSchema,
        temperature: 0.3,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);
    
    if (
      typeof parsedResponse.minPrice !== 'number' ||
      typeof parsedResponse.maxPrice !== 'number'
    ) {
      throw new Error('Invalid price format in API response.');
    }

    return parsedResponse as CarPriceEstimate;

  } catch (error) {
    console.error("Error fetching car price estimate:", error);
    throw new Error(
      "Fiyat tahmini alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyin veya model adını kontrol edin."
    );
  }
};


export const getCarRecommendation = async (budget: number): Promise<CarRecommendation> => {
    try {
        const prompt = `Sen Türkiye'deki otomobil piyasası konusunda uzman bir yapay zekasın. Sana vereceğim bütçenin, 2025-2026 yıllarındaki alım gücünü temsil ettiğini varsay. Bu bütçeyle o tarihlerde alınabilecek, fiyat/performans oranı en yüksek arabayı öner. Önerin, o dönemin piyasa koşullarına göre GERÇEKÇİ ve ULAŞILABİLİR olmalı. Spekülatif ve aşırı pahalı modellerden kaçın. Model yılı, yakıt tüketimi, bakım maliyetleri ve güvenilirlik gibi faktörleri önceliklendir. Cevabını sadece ve sadece belirttiğim JSON formatında ver. Bütçe: "${budget} TL"`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recommendationSchema,
                temperature: 0.5,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as CarRecommendation;

    } catch (error) {
        console.error("Error fetching car recommendation:", error);
        throw new Error(
            "Araç tavsiyesi alınırken bir hata oluştu. Lütfen bütçenizi kontrol edip tekrar deneyin."
        );
    }
};


export const generateCarImage = async (carModel: string, view: 'side' | 'front'): Promise<string> => {
    try {
        const prompt = `A professional, high-resolution photograph of a ${carModel}. The car is in a clean, studio setting with soft, realistic lighting. ${view} view of the car. No people or text in the image.`;
        
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }

    } catch (error) {
        console.error(`Error generating ${view} car image:`, error);
        // Return an empty string on failure so the app doesn't break.
        return "";
    }
};