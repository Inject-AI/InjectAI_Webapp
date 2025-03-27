import { TokenData } from "@/hooks/useMarketData";

const COINGECKO_API_KEY = "CG-cmLey4efgLR8T2kAB5d7pZQs";
const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";
const MISTRAL_API_KEY = "orx6JTWS5P5EOzG1paA0rSti6g87Dkp4";
const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

// Fetch market data from CoinGecko
export const fetchMarketData = async (limit: number = 10): Promise<TokenData[]> => {
  try {
    const response = await fetch(
      `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&x_cg_demo_api_key=${COINGECKO_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch market data');
    }

    const data = await response.json();
    
    return data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price,
      price_change_24h: coin.price_change_percentage_24h,
      market_cap: coin.market_cap,
      volume_24h: coin.total_volume,
      circulating_supply: coin.circulating_supply
    }));
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
};

// Fetch token report from CoinGecko
export const fetchTokenReport = async (tokenId: string): Promise<TokenReport> => {
  try {
    // Fetch detailed coin data
    const [coinData, marketData] = await Promise.all([
      fetch(`${COINGECKO_API_URL}/coins/${tokenId}?x_cg_demo_api_key=${COINGECKO_API_KEY}`).then(res => res.json()),
      fetch(`${COINGECKO_API_URL}/coins/${tokenId}/market_chart?vs_currency=usd&days=1&x_cg_demo_api_key=${COINGECKO_API_KEY}`).then(res => res.json())
    ]);

    // Determine sentiment based on price change
    const sentiment = coinData.market_data.price_change_percentage_24h > 0 ? "bullish" : 
                     coinData.market_data.price_change_percentage_24h < -5 ? "bearish" : "neutral";

    // Determine trading signals based on various metrics
    const signals = {
      shortTerm: coinData.market_data.price_change_percentage_24h > 2 ? "buy" : 
                 coinData.market_data.price_change_percentage_24h < -2 ? "sell" : "hold",
      mediumTerm: "hold",
      longTerm: coinData.market_data.price_change_percentage_30d > 0 ? "buy" : "hold"
    };

    return {
      token: coinData.name,
      symbol: coinData.symbol.toUpperCase(),
      price: coinData.market_data.current_price.usd,
      change24h: coinData.market_data.price_change_percentage_24h,
      marketCap: coinData.market_data.market_cap.usd,
      volume24h: coinData.market_data.total_volume.usd,
      analysis: `${coinData.name} (${coinData.symbol.toUpperCase()}) has shown ${
        sentiment === "bullish" ? "positive" : sentiment === "bearish" ? "negative" : "stable"
      } performance in the past 24 hours with a ${Math.abs(coinData.market_data.price_change_percentage_24h).toFixed(2)}% ${
        coinData.market_data.price_change_percentage_24h > 0 ? "gain" : "loss"
      }. Trading volume has reached $${(coinData.market_data.total_volume.usd / 1000000).toFixed(2)}M with a market cap of $${
        (coinData.market_data.market_cap.usd / 1000000000).toFixed(2)
      }B.`,
      sentiment,
      signals,
      recentNews: [
        {
          title: `${coinData.name} Price Analysis: ${sentiment.charAt(0).toUpperCase() + sentiment.slice(1)} Momentum`,
          source: "CoinGecko",
          url: `https://www.coingecko.com/en/coins/${tokenId}`,
          date: new Date().toISOString().split('T')[0]
        },
        {
          title: `Market Update: ${coinData.name} Trading Volume Reaches $${(coinData.market_data.total_volume.usd / 1000000).toFixed(2)}M`,
          source: "CoinGecko",
          url: `https://www.coingecko.com/en/coins/${tokenId}`,
          date: new Date().toISOString().split('T')[0]
        },
        {
          title: `${coinData.name} Market Cap Analysis: $${(coinData.market_data.market_cap.usd / 1000000000).toFixed(2)}B Valuation`,
          source: "CoinGecko",
          url: `https://www.coingecko.com/en/coins/${tokenId}`,
          date: new Date().toISOString().split('T')[0]
        }
      ]
    };
  } catch (error) {
    console.error("Error fetching token report:", error);
    throw error;
  }
};

// Fetch AI response from Mistral
export const fetchAIResponse = async (prompt: string): Promise<string> => {
  try {
    const systemPrompt = `You are a cryptocurrency and blockchain expert AI assistant. 
    Provide accurate, helpful information about crypto markets, tokens, technology, and trends. 
    Focus on factual information and avoid speculation. If you're unsure about something, say so.
    Keep responses clear, concise, and informative.`;

    const response = await fetch(MISTRAL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: "mistral-medium",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch AI response');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  }
};

export interface TokenReport {
  token: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  analysis: string;
  sentiment: "bullish" | "neutral" | "bearish";
  signals: {
    shortTerm: "buy" | "hold" | "sell";
    mediumTerm: "buy" | "hold" | "sell";
    longTerm: "buy" | "hold" | "sell";
  };
  recentNews: {
    title: string;
    source: string;
    url: string;
    date: string;
  }[];
}