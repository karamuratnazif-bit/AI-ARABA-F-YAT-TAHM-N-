
export interface CarPriceEstimate {
  minPrice: number;
  maxPrice: number;
  currency: string;
  explanation: string;
  model: string;
}

export interface ServiceError {
  message: string;
}

export interface CarRecommendation {
  model: string;
  reasoning: string;
}

export interface RecommendationResult extends CarRecommendation {
  frontImageUrl: string;
  sideImageUrl: string;
}
