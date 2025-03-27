
import React from "react";
import { User } from "lucide-react";
import { Input } from "@/components/ui/input";

interface UserInfoCardProps {
  username: string;
  bio: string;
  joinedDate: string;
  address: string | null;
  isEditing: boolean;
  setUsername: (value: string) => void;
  setBio: (value: string) => void;
}

const UserInfoCard = ({
  username,
  bio,
  joinedDate,
  address,
  isEditing,
  setUsername,
  setBio,
}: UserInfoCardProps) => {
  return (
    <div className="bg-secondary/30 rounded-lg p-5 flex-1">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
          <User className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <div>
                <div className="text-sm text-muted-foreground">Username</div>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Bio</div>
                <Input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="font-medium">{username}</div>
              <div className="text-sm text-muted-foreground mt-1">{bio}</div>
            </>
          )}
          <div className="text-sm text-muted-foreground mt-1">
            Member since {joinedDate}
          </div>
          {address && (
            <div className="text-sm text-muted-foreground mt-1">
              Wallet: {address.slice(0, 8)}...{address.slice(-6)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
