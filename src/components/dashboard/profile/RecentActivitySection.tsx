
import React from "react";
import { Clock } from "lucide-react";

interface Activity {
  type: string;
  points: number;
  timestamp: string;
  description: string;
}

interface RecentActivitySectionProps {
  activities: Activity[];
}

const RecentActivitySection = ({ activities }: RecentActivitySectionProps) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-4">Recent Activity</h4>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 bg-secondary/30 p-3 rounded-lg">
            <div className="h-8 w-8 rounded-md bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h5 className="font-medium">{activity.description}</h5>
                <div className="text-sm font-medium text-primary">
                  +{activity.points} points
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {activity.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivitySection;
