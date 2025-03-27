
import React from "react";
import { useMarketData } from "@/hooks/useMarketData";
import GlassCard from "../ui/GlassCard";
import { ArrowDown, ArrowUp, BarChart3, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const MarketInsights = () => {
  const { tokens, isLoading, error } = useMarketData();

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

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-medium">Market Insights</h3>
        </div>
        <button className="p-1 rounded-md hover:bg-secondary transition-colors">
          <Info className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 rounded-lg bg-secondary/50 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-6">
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : (
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left pb-2 font-medium text-muted-foreground text-sm">Token</th>
                  <th className="text-right pb-2 font-medium text-muted-foreground text-sm">Price</th>
                  <th className="text-right pb-2 font-medium text-muted-foreground text-sm">24h Change</th>
                  <th className="text-right pb-2 font-medium text-muted-foreground text-sm">Market Cap</th>
                  <th className="text-right pb-2 font-medium text-muted-foreground text-sm">Volume (24h)</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token) => (
                  <tr key={token.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                          {token.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{token.name}</div>
                          <div className="text-muted-foreground text-xs">{token.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      ${formatNumber(token.price)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className={cn(
                        "inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm",
                        token.price_change_24h >= 0
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                      )}>
                        {token.price_change_24h >= 0 ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )}
                        {Math.abs(token.price_change_24h)}%
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground">
                      ${formatNumber(token.market_cap, true)}
                    </td>
                    <td className="py-3 pl-4 text-right text-muted-foreground">
                      ${formatNumber(token.volume_24h, true)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

export default MarketInsights;
