
import { useState, useEffect } from "react";
import { fetchMarketData } from "@/lib/api";

export interface TokenData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  price_change_24h: number;
  market_cap: number;
  volume_24h: number;
  circulating_supply: number;
}

export const useMarketData = (limit: number = 10) => {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMarketData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMarketData(limit);
        setTokens(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching market data:", err);
        setError("Failed to fetch market data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    getMarketData();

    // Refresh data every 60 seconds
    const intervalId = setInterval(getMarketData, 60000);
    
    return () => clearInterval(intervalId);
  }, [limit]);

  return { tokens, isLoading, error };
};
