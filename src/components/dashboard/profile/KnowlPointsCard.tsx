
import React from "react";
import { Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface KnowlPointsCardProps {
  knowlPoints: number;
  level: number;
  nextLevel: number;
  progress: number;
  pointsToNextLevel: number;
}

const KnowlPointsCard = ({
  knowlPoints,
  level,
  nextLevel,
  progress,
  pointsToNextLevel,
}: KnowlPointsCardProps) => {
  return (
    <div className="bg-secondary/30 rounded-lg p-5 flex-1">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Knowl Points</div>
          <div className="text-3xl font-semibold">{knowlPoints}</div>
          <div className="mt-2">
            <div className="flex items-center justify-between text-sm mb-1">
              <div className="text-muted-foreground">Level {level}</div>
              <div className="text-muted-foreground">
                {pointsToNextLevel} points needed for Level {nextLevel}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/30 flex items-center justify-center">
          <Trophy className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default KnowlPointsCard;
