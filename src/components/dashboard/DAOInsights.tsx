
import React, { useState, useEffect } from "react";
import GlassCard from "../ui/GlassCard";
import { Vote, ThumbsUp, ThumbsDown, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { toast } from "sonner";
import WalletConnectPrompt from "./profile/WalletConnectPrompt";

interface DAOProposal {
  id: string;
  title: string;
  description: string;
  status: "active" | "passed" | "rejected" | "pending";
  votingEnds: string;
  yesVotes: number;
  noVotes: number;
  abstainVotes: number;
  totalVotes: number;
  userVote?: "yes" | "no" | "abstain" | null;
  aiAnalysis: {
    pros: string[];
    cons: string[];
    recommendation: "yes" | "no" | "abstain" | "neutral";
  };
}

const initialProposals: DAOProposal[] = [
  {
    id: "INJ-DAO-42",
    title: "Upgrade Injective Staking Rewards Distribution",
    description: "This proposal seeks to modify the distribution mechanism for staking rewards on the Injective chain to improve validator decentralization.",
    status: "active",
    votingEnds: "2 days",
    yesVotes: 2345678,
    noVotes: 765432,
    abstainVotes: 123456,
    totalVotes: 3234566,
    userVote: null,
    aiAnalysis: {
      pros: [
        "Improves validator decentralization",
        "More equitable reward distribution",
        "Aligns with long-term sustainability goals"
      ],
      cons: [
        "May temporarily reduce rewards for larger validators",
        "Implementation complexity could delay other upgrades",
        "Short-term market volatility possible during transition"
      ],
      recommendation: "yes"
    }
  },
  {
    id: "INJ-DAO-41",
    title: "Implement Cross-Chain Messaging Protocol",
    description: "Add support for a standardized cross-chain messaging protocol to enhance interoperability between Injective and other major blockchains.",
    status: "passed",
    votingEnds: "Ended",
    yesVotes: 5678901,
    noVotes: 234567,
    abstainVotes: 98765,
    totalVotes: 6012233,
    aiAnalysis: {
      pros: [
        "Significant boost to ecosystem interoperability",
        "Opens new DeFi integration possibilities",
        "Keeps Injective competitive with other chains"
      ],
      cons: [
        "New security considerations with cross-chain messages",
        "Additional resource requirements for validators",
        "Potential for increased transaction complexity"
      ],
      recommendation: "yes"
    }
  },
  {
    id: "INJ-DAO-40",
    title: "Treasury Allocation for Developer Grants",
    description: "Allocate 1M INJ from the community treasury for developer grants to support new projects building on the Injective ecosystem.",
    status: "rejected",
    votingEnds: "Ended",
    yesVotes: 1234567,
    noVotes: 2345678,
    abstainVotes: 123456,
    totalVotes: 3703701,
    aiAnalysis: {
      pros: [
        "Attracts more developers to the ecosystem",
        "Potential for innovative new applications",
        "Strategic investment in growth"
      ],
      cons: [
        "Significant treasury outflow during market uncertainty",
        "Lack of specific oversight mechanisms for fund allocation",
        "Alternative funding methods not fully explored"
      ],
      recommendation: "no"
    }
  }
];

const DAOInsights = () => {
  const [proposals, setProposals] = useState<DAOProposal[]>(() => {
    // Try to load from localStorage first
    const savedProposals = localStorage.getItem("daoProposals");
    return savedProposals ? JSON.parse(savedProposals) : initialProposals;
  });
  const [selectedProposal, setSelectedProposal] = useState<DAOProposal>(() => {
    // Try to load selectedProposalId from localStorage
    const savedProposalId = localStorage.getItem("selectedProposalId");
    const savedProposals = localStorage.getItem("daoProposals");
    const parsedProposals = savedProposals ? JSON.parse(savedProposals) : initialProposals;
    
    if (savedProposalId) {
      const found = parsedProposals.find((p: DAOProposal) => p.id === savedProposalId);
      return found || parsedProposals[0];
    }
    return parsedProposals[0];
  });
  
  const { isConnected, connect } = useWallet();

  // Save proposals and selected proposal to localStorage when they change
  useEffect(() => {
    localStorage.setItem("daoProposals", JSON.stringify(proposals));
    localStorage.setItem("selectedProposalId", selectedProposal.id);
  }, [proposals, selectedProposal.id]);

  // Update selected proposal when proposals change
  useEffect(() => {
    const updatedProposal = proposals.find(p => p.id === selectedProposal.id);
    if (updatedProposal) {
      setSelectedProposal(updatedProposal);
    }
  }, [proposals, selectedProposal.id]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(num);
  };

  const handleVote = (vote: 'yes' | 'no' | 'abstain') => {
    if (!isConnected) {
      toast.error("Please connect your Keplr wallet to vote");
      return;
    }
    
    if (selectedProposal.status !== 'active') {
      toast.info("This proposal is no longer active");
      return;
    }
    
    // Create updated proposals with the vote
    const updatedProposals = proposals.map(proposal => {
      if (proposal.id === selectedProposal.id) {
        const updatedProposal = { ...proposal, userVote: vote };
        
        // Remove previous vote if exists
        if (proposal.userVote === 'yes') updatedProposal.yesVotes -= 1;
        if (proposal.userVote === 'no') updatedProposal.noVotes -= 1;
        if (proposal.userVote === 'abstain') updatedProposal.abstainVotes -= 1;
        
        // Add new vote
        if (vote === 'yes') updatedProposal.yesVotes += 1;
        if (vote === 'no') updatedProposal.noVotes += 1;
        if (vote === 'abstain') updatedProposal.abstainVotes += 1;
        
        // Update total votes only if this is a first-time vote
        if (!proposal.userVote) updatedProposal.totalVotes += 1;
        
        return updatedProposal;
      }
      return proposal;
    });
    
    setProposals(updatedProposals);
    toast.success(`You voted ${vote} on proposal ${selectedProposal.id}`);
  };

  const getStatusColor = (status: DAOProposal['status']) => {
    switch (status) {
      case 'active':
        return 'bg-blue-500/20 text-blue-500';
      case 'passed':
        return 'bg-green-500/20 text-green-500';
      case 'rejected':
        return 'bg-red-500/20 text-red-500';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
    }
  };

  const getRecommendationColor = (rec: DAOProposal['aiAnalysis']['recommendation']) => {
    switch (rec) {
      case 'yes':
        return 'text-green-500';
      case 'no':
        return 'text-red-500';
      case 'abstain':
      case 'neutral':
        return 'text-yellow-500';
    }
  };

  const handleSelectProposal = (proposal: DAOProposal) => {
    setSelectedProposal(proposal);
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Vote className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-medium">DAO Governance Insights</h3>
        </div>
      </div>

      {!isConnected ? (
        <WalletConnectPrompt onConnect={connect} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Proposals list */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-medium mb-3">Active Proposals</h4>
            <div className="space-y-3">
              {proposals.map((proposal) => (
                <div 
                  key={proposal.id}
                  onClick={() => handleSelectProposal(proposal)}
                  className={cn(
                    "p-4 rounded-lg border border-border cursor-pointer transition-all",
                    selectedProposal.id === proposal.id 
                      ? "bg-primary/10 border-primary/50" 
                      : "bg-secondary/30 hover:bg-secondary/50"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-muted-foreground">{proposal.id}</span>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded capitalize",
                      getStatusColor(proposal.status)
                    )}>
                      {proposal.status}
                    </span>
                  </div>
                  <h5 className="font-medium mb-1">{proposal.title}</h5>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{proposal.votingEnds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{formatNumber(proposal.totalVotes)}</span>
                    </div>
                  </div>
                  {proposal.userVote && (
                    <div className="mt-2 text-xs">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">
                        You voted: {proposal.userVote}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Proposal details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-muted-foreground">{selectedProposal.id}</span>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded capitalize",
                  getStatusColor(selectedProposal.status)
                )}>
                  {selectedProposal.status}
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-2">{selectedProposal.title}</h4>
              <p className="text-muted-foreground mb-4">{selectedProposal.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                    <span>{formatNumber(selectedProposal.yesVotes)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="h-4 w-4 text-red-500" />
                    <span>{formatNumber(selectedProposal.noVotes)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {selectedProposal.status === 'active' 
                      ? `Ends in ${selectedProposal.votingEnds}` 
                      : 'Voting ended'}
                  </span>
                </div>
              </div>
              
              {selectedProposal.userVote && (
                <div className="mt-4 mb-2 text-sm">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                    Your vote: {selectedProposal.userVote}
                  </span>
                </div>
              )}
              
              {selectedProposal.status === 'active' && (
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    className={cn(
                      "flex-1 bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-600",
                      selectedProposal.userVote === 'yes' && "ring-2 ring-green-500"
                    )}
                    onClick={() => handleVote('yes')}
                  >
                    Vote Yes
                  </Button>
                  <Button 
                    variant="outline" 
                    className={cn(
                      "flex-1 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-600",
                      selectedProposal.userVote === 'no' && "ring-2 ring-red-500"
                    )}
                    onClick={() => handleVote('no')}
                  >
                    Vote No
                  </Button>
                  <Button 
                    variant="outline" 
                    className={cn(
                      "flex-1",
                      selectedProposal.userVote === 'abstain' && "ring-2 ring-primary"
                    )}
                    onClick={() => handleVote('abstain')}
                  >
                    Abstain
                  </Button>
                </div>
              )}
            </div>
            
            {/* AI Analysis */}
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium">AI Analysis</h5>
                <div className="flex items-center gap-1">
                  <span className="text-sm">Recommendation:</span>
                  <span className={cn(
                    "text-sm font-medium capitalize",
                    getRecommendationColor(selectedProposal.aiAnalysis.recommendation)
                  )}>
                    {selectedProposal.aiAnalysis.recommendation}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h6 className="text-sm font-medium text-green-500 mb-2">Pros</h6>
                  <ul className="space-y-2">
                    {selectedProposal.aiAnalysis.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="mt-0.5 h-4 w-4 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                          <ThumbsUp className="h-2 w-2 text-green-500" />
                        </div>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h6 className="text-sm font-medium text-red-500 mb-2">Cons</h6>
                  <ul className="space-y-2">
                    {selectedProposal.aiAnalysis.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="mt-0.5 h-4 w-4 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                          <ThumbsDown className="h-2 w-2 text-red-500" />
                        </div>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

export default DAOInsights;
