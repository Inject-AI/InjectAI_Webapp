
import React, { useState } from "react";
import GlassCard from "../ui/GlassCard";
import { useWallet } from "@/hooks/useWallet";
import { User, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import UserInfoCard from "./profile/UserInfoCard";
import KnowlPointsCard from "./profile/KnowlPointsCard";
import AchievementsSection from "./profile/AchievementsSection";
import RecentActivitySection from "./profile/RecentActivitySection";
import WalletConnectPrompt from "./profile/WalletConnectPrompt";

const UserProfile = () => {
  const { isConnected, address, balance, connect } = useWallet();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("Crypto Enthusiast");
  const [bio, setBio] = useState("Blockchain developer and crypto analyst interested in Injective ecosystem.");

  // Mock user data
  const user = {
    knowlPoints: 325,
    level: 3,
    nextLevel: 4,
    progress: 65,
    pointsToNextLevel: 175,
    joinedDate: "Nov 2023",
    achievements: [
      {
        name: "Early Adopter",
        description: "Joined during platform beta",
        earned: true,
      },
      {
        name: "Insight Seeker",
        description: "Asked 10+ questions to AI assistant",
        earned: true,
      },
      {
        name: "Market Analyst",
        description: "Viewed 50+ token reports",
        earned: false,
      },
      {
        name: "Governance Participant",
        description: "Participated in DAO voting",
        earned: false,
      },
    ],
    recentActivity: [
      {
        type: "ai_interaction",
        points: 5,
        timestamp: "2h ago",
        description: "Asked about INJ price analysis",
      },
      {
        type: "report_view",
        points: 10,
        timestamp: "Yesterday",
        description: "Viewed detailed Bitcoin report",
      },
      {
        type: "market_check",
        points: 2,
        timestamp: "3 days ago",
        description: "Checked real-time market data",
      },
    ],
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-medium">User Profile</h3>
        </div>
        {isConnected && (
          <>
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
                <Button variant="default" size="sm" onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-1" /> Save
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </>
        )}
      </div>

      {!isConnected ? (
        <WalletConnectPrompt onConnect={connect} />
      ) : (
        <div className="space-y-8 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-6">
            {/* User info card */}
            <UserInfoCard
              username={username}
              bio={bio}
              joinedDate={user.joinedDate}
              address={address}
              isEditing={isEditing}
              setUsername={setUsername}
              setBio={setBio}
            />

            {/* Knowl points card */}
            <KnowlPointsCard
              knowlPoints={user.knowlPoints}
              level={user.level}
              nextLevel={user.nextLevel}
              progress={user.progress}
              pointsToNextLevel={user.pointsToNextLevel}
            />
          </div>

          {/* Achievements section */}
          <AchievementsSection achievements={user.achievements} />

          {/* Recent activity section */}
          <RecentActivitySection activities={user.recentActivity} />
        </div>
      )}
    </GlassCard>
  );
};

export default UserProfile;
