import React, { useState, useEffect } from "react";
import GlassCard from "../ui/GlassCard";
import { FileText, ArrowUp, ArrowDown, Zap, Wallet } from "lucide-react";
import { fetchTokenReport, TokenReport } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useWallet } from "@/hooks/useWallet";
import WalletConnectPrompt from "./profile/WalletConnectPrompt";

interface TokenReportsProps {
  searchQuery?: string;
}

const TokenReports = ({ searchQuery = "" }: TokenReportsProps) => {
  const { isConnected, connect } = useWallet();
  const [activeToken, setActiveToken] = useState("injective-protocol");
  const [report, setReport] = useState<TokenReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const tokens = [
    { id: "injective-protocol", name: "Injective", symbol: "INJ" },
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH" },
    { id: "solana", name: "Solana", symbol: "SOL" },
    { id: "cardano", name: "Cardano", symbol: "ADA" },
    { id: "polkadot", name: "Polkadot", symbol: "DOT" },
  ];

  useEffect(() => {
    // If there's a search query, try to find a matching token
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const foundToken = tokens.find(
        token => 
          token.id.toLowerCase().includes(lowerCaseQuery) || 
          token.name.toLowerCase().includes(lowerCaseQuery) || 
          token.symbol.toLowerCase().includes(lowerCaseQuery)
      );
      
      if (foundToken) {
        setActiveToken(foundToken.id);
      }
    }
  }, [searchQuery]);

  useEffect(() => {
    // Only fetch data if wallet is connected
    if (!isConnected) return;
    
    const getReport = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTokenReport(activeToken);
        setReport(data);
      } catch (error) {
        console.error("Error fetching token report:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getReport();
  }, [activeToken, isConnected]);

  // Format numbers
  const formatNumber = (num: number, compact = false) => {
    if (compact) {
      return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 2
      }).format(num);
    }
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  // Filter tokens based on search query for the button display
  const filteredTokens = searchQuery 
    ? tokens.filter(token => 
        token.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      ) 
    : tokens;

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-medium">AI Token Reports</h3>
        </div>

        {isConnected && (
          <div className="flex flex-wrap gap-2">
            {filteredTokens.length > 0 ? (
              filteredTokens.map((token) => (
                <button
                  key={token.id}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-md transition-colors",
                    activeToken === token.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  )}
                  onClick={() => setActiveToken(token.id)}
                >
                  {token.symbol}
                </button>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">No matching tokens</div>
            )}
          </div>
        )}
      </div>

      {!isConnected ? (
        <WalletConnectPrompt 
          onConnect={connect}
          title="Connect Wallet to View Reports"
          description="Connect your Keplr wallet to access detailed AI-generated market analysis, price predictions, and insights for cryptocurrency tokens."
          icon={<Wallet className="h-8 w-8 text-muted-foreground" />}
        />
      ) : isLoading ? (
        <div className="space-y-4">
          <div className="h-20 rounded-lg bg-secondary/50 animate-pulse" />
          <div className="h-40 rounded-lg bg-secondary/50 animate-pulse" />
          <div className="h-20 rounded-lg bg-secondary/50 animate-pulse" />
        </div>
      ) : report ? (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Current Price</div>
              <div className="text-2xl font-semibold">${formatNumber(report.price)}</div>
              <div className={cn(
                "mt-1 inline-flex items-center gap-1 text-sm",
                report.change24h >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {report.change24h >= 0 ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                {Math.abs(report.change24h)}% (24h)
              </div>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Market Cap</div>
              <div className="text-2xl font-semibold">${formatNumber(report.marketCap, true)}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Volume: ${formatNumber(report.volume24h, true)}
              </div>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Sentiment</div>
              <div className={cn(
                "text-xl font-semibold capitalize",
                report.sentiment === "bullish" ? "text-green-500" : 
                report.sentiment === "bearish" ? "text-red-500" : "text-yellow-500"
              )}>
                {report.sentiment}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className={cn(
                  "text-xs px-2 py-0.5 rounded",
                  report.signals.shortTerm === "buy" ? "bg-green-500/20 text-green-500" :
                  report.signals.shortTerm === "sell" ? "bg-red-500/20 text-red-500" : 
                  "bg-yellow-500/20 text-yellow-500"
                )}>
                  {report.signals.shortTerm} (short)
                </div>
                <div className={cn(
                  "text-xs px-2 py-0.5 rounded",
                  report.signals.longTerm === "buy" ? "bg-green-500/20 text-green-500" :
                  report.signals.longTerm === "sell" ? "bg-red-500/20 text-red-500" : 
                  "bg-yellow-500/20 text-yellow-500"
                )}>
                  {report.signals.longTerm} (long)
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary/30 rounded-lg p-4">
            <h4 className="text-lg font-medium mb-2">AI Analysis</h4>
            <p className="text-muted-foreground">{report.analysis}</p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-3">Recent News</h4>
            <div className="space-y-3">
              {report.recentNews.map((news) => (
                <div key={news.title} className="flex items-start gap-3 bg-secondary/30 p-3 rounded-lg">
                  <div className="h-8 w-8 rounded-md bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-medium">{news.title}</h5>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                      <span className="text-muted-foreground">{news.source}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{news.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-muted-foreground">Failed to load report</p>
        </div>
      )}
    </GlassCard>
  );
};

export default TokenReports;
