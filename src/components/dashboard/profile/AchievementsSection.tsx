
import React from "react";
import { BadgeCheck, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Achievement {
  name: string;
  description: string;
  earned: boolean;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
}

const AchievementsSection = ({ achievements }: AchievementsSectionProps) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-4">Achievements</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.name}
            className={cn(
              "p-4 rounded-lg border",
              achievement.earned
                ? "bg-primary/10 border-primary/30"
                : "bg-secondary/30 border-white/10"
            )}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center",
                  achievement.earned ? "bg-primary/30" : "bg-secondary"
                )}
              >
                {achievement.earned ? (
                  <BadgeCheck className="h-4 w-4 text-primary" />
                ) : (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <h5
                className={cn(
                  "font-medium",
                  !achievement.earned && "text-muted-foreground"
                )}
              >
                {achievement.name}
              </h5>
            </div>
            <p className="text-sm text-muted-foreground">
              {achievement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
