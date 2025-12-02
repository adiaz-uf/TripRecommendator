/**
 * Interface for a single travel recommendation object 
 * that the GPT model must return.
 */
export interface TravelRecommendation {
  locationName: string;
  description: string;
  latitude: number;
  longitude: number;
}

/**
 * Interface for the request body coming from the frontend.
 */
export interface FrontendRequest {
    userInputText: string;
}